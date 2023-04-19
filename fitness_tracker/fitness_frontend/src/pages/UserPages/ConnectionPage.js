import { useState } from 'react';
import UserNavBar from "../../components/UserNavBar";



function ConnectionPage() {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);

  async function connectToDevice() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['<service UUID>'] }]
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('<service UUID>');
      const heartRate = await service.getCharacteristic('<characteristic UUID>');
      const temperature = await service.getCharacteristic('<characteristic UUID>');
      const steps = await service.getCharacteristic('<characteristic UUID>');
      const sample = await service.getCharacteristic('<characteristic UUID>');
      const start = await service.getCharacteristic('<characteristic UUID>');
      const pause = await service.getCharacteristic('<characteristic UUID>');

      await heartRate.startNotifications();
      await temperature.startNotifications();
      await steps.startNotifications();

      heartRate.addEventListener('characteristicvaluechanged', e => {
        const value = e.target.value.getUint8(0);

        console.log(`${'<characteristic UUID>'} changed`, value);
      });
      heartRate.readValue();

      temperature.addEventListener('characteristicvaluechanged', e => {
        const value = e.target.value.getUint8(0);

        console.log(`${'<characteristic UUID>'} changed`, value);
      });
      temperature.readValue();

      steps.addEventListener('characteristicvaluechanged', e => {
        const value = e.target.value.getUint8(0);

        console.log(`${'<characteristic UUID>'} changed`, value);
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