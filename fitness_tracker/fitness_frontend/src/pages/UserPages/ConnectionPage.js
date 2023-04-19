import { useState } from 'react';
import UserNavBar from "../../components/UserNavBar";



function ConnectionPage() {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);

  async function connectToDevice() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["98f07b22-9e93-4804-8628-296aa44af7c5"] }]
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("98f07b22-9e93-4804-8628-296aa44af7c5");
      const heartRate = await service.getCharacteristic("47ce1097-088b-4e84-addc-0e31013865ab");
      const temperature = await service.getCharacteristic("0787dd0d-2eff-47af-acc4-f84c50e958bf");
      const steps = await service.getCharacteristic("72a2030c-de20-41a0-ae42-2aa1dd07e977");
      const sample = await service.getCharacteristic("439fe6eb-5d9a-422a-b000-125e851369d9");
      const start = await service.getCharacteristic("53cc21de-eb2a-4ef9-a77b-0d1ede302878");
      const pause = await service.getCharacteristic("4e75a2d1-3811-4be4-8097-2a20f210385c");

      await heartRate.startNotifications();
      await temperature.startNotifications();
      await steps.startNotifications();

      heartRate.addEventListener('characteristicvaluechanged', e => {
        const value = e.target.value.getUint8(0);

        console.log(`${"47ce1097-088b-4e84-addc-0e31013865ab"} changed`, value);
      });
      heartRate.readValue();

      temperature.addEventListener('characteristicvaluechanged', e => {
        const value = e.target.value.getUint8(0);

        console.log(`${"0787dd0d-2eff-47af-acc4-f84c50e958bf"} changed`, value);
      });
      temperature.readValue();

      steps.addEventListener('characteristicvaluechanged', e => {
        const value = e.target.value.getUint8(0);

        console.log(`${"72a2030c-de20-41a0-ae42-2aa1dd07e977"} changed`, value);
      });
      steps.readValue();

      setConnected(true);
      setDevice(device);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
        <><UserNavBar></UserNavBar><div>
          <h1>Hello World</h1>
          <button onClick={connectToDevice}>Connect to Your Device</button>
          {connected && (
              <p>Connected to device: {device.name}</p>
          )}
      </div></>
  );
}

export default ConnectionPage;