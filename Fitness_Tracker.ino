#include <ArduinoBLE.h>
#include <FitnessTracker_inferencing.h>
#include "Arduino_BMI270_BMM150.h"
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"

/* Constant defines -------------------------------------------------------- */
#define CONVERT_G_TO_MS2    9.80665f
#define MAX_ACCEPTED_RANGE  2.0f

/* Private variables ------------------------------------------------------- */
static bool debug_nn = false; // Set this to true to see e.g. features generated from the raw signal
static uint32_t run_inference_every_ms = 500;
static rtos::Thread inference_thread(osPriorityLow);
static float buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE] = { 0 };
static float inference_buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE];

static rtos::Thread hr_thread(osPriorityNormal);

/* Forward declaration */
void run_inference_background();
void heart_rate_background();

MAX30105 particleSensor;

const byte RATE_SIZE = 4; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred

float beatsPerMinute;
int beatAvg;

// Bluetooth® Low Energy Battery Service
BLEService healthService("98f07b22-9e93-4804-8628-296aa44af7c5");

// Bluetooth® Low Energy Battery Level Characteristic
BLEIntCharacteristic heartRateChar("47ce1097-088b-4e84-addc-0e31013865ab", BLERead | BLENotify);
BLEIntCharacteristic temperatureChar("0787dd0d-2eff-47af-acc4-f84c50e958bf", BLERead | BLENotify);
BLEIntCharacteristic stepsChar("72a2030c-de20-41a0-ae42-2aa1dd07e977", BLERead | BLENotify);
BLEByteCharacteristic sampleChar("439fe6eb-5d9a-422a-b000-125e851369d9", BLERead | BLENotify);
BLEByteCharacteristic startChar("53cc21de-eb2a-4ef9-a77b-0d1ede302878", BLERead | BLENotify);
BLEByteCharacteristic pauseChar("4e75a2d1-3811-4be4-8097-2a20f210385c", BLERead | BLENotify);

void setup() {
  Serial.begin(115200);    // initialize serial communication
  while (!Serial);
  Serial.println("Started");


  pinMode(LED_BUILTIN, OUTPUT); // initialize the built-in LED pin to indicate when a central is connected

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");

    while (1);
  }

  BLE.setLocalName("FitnessMonitor");
  BLE.setAdvertisedService(healthService); // add the service UUID
  healthService.addCharacteristic(heartRateChar); // add the characteristics
  healthService.addCharacteristic(temperatureChar);
  healthService.addCharacteristic(stepsChar);
  healthService.addCharacteristic(sampleChar);
  healthService.addCharacteristic(startChar);
  healthService.addCharacteristic(pauseChar);
  BLE.addService(healthService); // Add the service
  heartRateChar.writeValue(0); // set initial value for each characteristic
  temperatureChar.writeValue(0);
  stepsChar.writeValue(0);
  sampleChar.writeValue(0);
  startChar.writeValue(0);
  pauseChar.writeValue(0);

  // start advertising
  BLE.advertise();

  Serial.println("Bluetooth® device active, waiting for connections...");

  if (!IMU.begin()) {
    ei_printf("Failed to initialize IMU!\r\n");
  }
  else {
    ei_printf("IMU initialized\r\n");
  }

  if (EI_CLASSIFIER_RAW_SAMPLES_PER_FRAME != 3) {
    ei_printf("ERR: EI_CLASSIFIER_RAW_SAMPLES_PER_FRAME should be equal to 3 (the 3 sensor axes)\n");
    return;
  }

  inference_thread.start(mbed::callback(&run_inference_background));

  if (particleSensor.begin(Wire, I2C_SPEED_FAST) == false)
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }

  particleSensor.setup(); //Configure sensor. Use 6.4mA for LED drive
  particleSensor.setPulseAmplitudeRed(0xFF); //Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED

  Serial.println("Starting HR Thread");

  hr_thread.start(mbed::callback(&heart_rate_background));
}

float ei_get_sign(float number) {
  return (number >= 0.0) ? 1.0 : -1.0;
}

void run_inference_background()
{
  // wait until we have a full buffer
  delay((EI_CLASSIFIER_INTERVAL_MS * EI_CLASSIFIER_RAW_SAMPLE_COUNT) + 100);

  // This is a structure that smoothens the output result
  // With the default settings 70% of readings should be the same before classifying.
  ei_classifier_smooth_t smooth;
  ei_classifier_smooth_init(&smooth, 10 /* no. of readings */, 7 /* min. readings the same */, 0.8 /* min. confidence */, 0.3 /* max anomaly */);

  while (1) {
    // copy the buffer
    memcpy(inference_buffer, buffer, EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE * sizeof(float));

    // Turn the raw buffer in a signal which we can the classify
    signal_t signal;
    int err = numpy::signal_from_buffer(inference_buffer, EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE, &signal);
    if (err != 0) {
      ei_printf("Failed to create signal from buffer (%d)\n", err);
      return;
    }

    // Run the classifier
    ei_impulse_result_t result = { 0 };

    err = run_classifier(&signal, &result, debug_nn);
    if (err != EI_IMPULSE_OK) {
      ei_printf("ERR: Failed to run classifier (%d)\n", err);
      return;
    }

    // print the predictions
    ei_printf("Predictions ");
    ei_printf("(DSP: %d ms., Classification: %d ms., Anomaly: %d ms.)",
      result.timing.dsp, result.timing.classification, result.timing.anomaly);
    ei_printf(": ");

    // ei_classifier_smooth_update yields the predicted label
    const char *prediction = ei_classifier_smooth_update(&smooth, &result);
    ei_printf("%s ", prediction);
    // print the cumulative results
    ei_printf(" [ ");
    for (size_t ix = 0; ix < smooth.count_size; ix++) {
      ei_printf("%u", smooth.count[ix]);
      if (ix != smooth.count_size + 1) {
        ei_printf(", ");
      }
      else {
        ei_printf(" ");
      }
    }
    ei_printf("]\n");

    if(prediction == "Steps"){
      stepsChar.writeValue(1);
    }
    else{
      stepsChar.writeValue(0);
    }

    delay(run_inference_every_ms);
  }

  ei_classifier_smooth_free(&smooth);
}

void heart_rate_background()
{
  Serial.println("HR thread started");
  int i = 0;
  while (1) {
    long irValue = particleSensor.getIR();

    if (checkForBeat(irValue) == true)
    {
      //We sensed a beat!
      long delta = millis() - lastBeat;
      lastBeat = millis();

      beatsPerMinute = 60 / (delta / 1000.0);

      if (beatsPerMinute < 255 && beatsPerMinute > 20)
      {
        rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
        rateSpot %= RATE_SIZE; //Wrap variable

        //Take average of readings
        beatAvg = 0;
        for (byte x = 0 ; x < RATE_SIZE ; x++)
          beatAvg += rates[x];
        beatAvg /= RATE_SIZE;
      }
    }
    i++;
    if (i > 100){
    Serial.print("IR=");
    Serial.print(irValue);
    Serial.print(", BPM=");
    Serial.print(beatsPerMinute);
    Serial.print(", Avg BPM=");
    Serial.print(beatAvg);

    if (irValue < 50000)
      Serial.print(" No finger?");

    Serial.println();
    heartRateChar.writeValue(beatAvg);
    i=0;
    }
  }
}

void loop() {
  // wait for a Bluetooth® Low Energy central
  BLEDevice central = BLE.central();

  // if a central is connected to the peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's BT address:
    Serial.println(central.address());
    // turn on the LED to indicate the connection:
    digitalWrite(LED_BUILTIN, HIGH);

    float x, y, z;

    // check the battery level every 200ms
    // while the central is connected:
    while (central.connected()) {
      // Determine the next tick (and then sleep later)
      uint64_t next_tick = micros() + (EI_CLASSIFIER_INTERVAL_MS * 1000);

      // roll the buffer -3 points so we can overwrite the last one
      numpy::roll(buffer, EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE, -3);

      // read to the end of the buffer
      IMU.readAcceleration(
        buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE - 3],
        buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE - 2],
        buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE - 1]
      );

      for (int i = 0; i < 3; i++) {
        if (fabs(buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE - 3 + i]) > MAX_ACCEPTED_RANGE) {
          buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE - 3 + i] = ei_get_sign(buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE - 3 + i]) * MAX_ACCEPTED_RANGE;
        }
      }

      buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE - 3] *= CONVERT_G_TO_MS2;
      buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE - 2] *= CONVERT_G_TO_MS2;
      buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE - 1] *= CONVERT_G_TO_MS2;

      // and wait for next tick
      uint64_t time_to_wait = next_tick - micros();
      delay((int)floor((float)time_to_wait / 1000.0f));
      delayMicroseconds(time_to_wait % 1000);
    }
    // when the central disconnects, turn off the LED:
    digitalWrite(LED_BUILTIN, LOW);
    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  }
}
