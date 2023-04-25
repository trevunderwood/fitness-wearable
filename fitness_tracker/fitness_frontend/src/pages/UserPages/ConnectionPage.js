import { useState } from 'react';
import UserNavBar from "../../components/UserNavBar";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { collection, doc, setDoc } from 'firebase/firestore';
import { useAuth } from "../../AuthContext";

const firebaseConfig = {
    apiKey: "AIzaSyA52p_7bAjYqIDHIIU3nECuljQ9_Lsz8r4",
    authDomain: "fitness-wearable-20b9d.firebaseapp.com",
    projectId: "fitness-wearable-20b9d",
    storageBucket: "fitness-wearable-20b9d.appspot.com",
    messagingSenderId: "551481552952",
    appId: "1:551481552952:web:c4896638c53d29dd7e76cd",
  };



function ConnectionPage() {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);
  const { currentUser } = useAuth();
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

      
      //UserID = currentUser.uid
      

      heartRate.addEventListener('characteristicvaluechanged', e => {
        const value = e.target.value.getUint8(0);

        console.log(`${"47ce1097-088b-4e84-addc-0e31013865ab"} changed`, value);
        updateHeartrateEverySecond(value);

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
        updateStepsEverySecond(value);
      });
      steps.readValue();

      setConnected(true);
      setDevice(device);
    } catch (error) {
      console.error('Error:', error);
    }
  }

function updateHeartrateEverySecond(valueToUpdate) {

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  const database = firebase.database();
  const user_ref= database.ref("Users/"+currentUser.uid);

  user_ref.update({ 'AverageHR' : valueToUpdate }); // Update the element with the provided value
}
// function updateTempEverySecond(valueToUpdate) {

//   firebase.initializeApp(firebaseConfig);

//   // Get a reference to the database service
//   const database = firebase.database();
//   const user_ref= database.ref("Users/"+currentUser.uid);

//   user_ref.update({ 'AverageHR' : valueToUpdate }); // Update the element with the provided value
// }
function updateStepsEverySecond(valueToUpdate) {

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  const database = firebase.database();
  const user_ref= database.ref("Users/"+currentUser.uid);

  user_ref.update({ 'TotalSteps' : valueToUpdate }); // Update the element with the provided value
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