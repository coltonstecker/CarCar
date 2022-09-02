import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App  />
  </React.StrictMode>
);


async function loadInventory() {
  let vehicleModelData;
  const vehicleModelResponse = await fetch('http://localhost:8100/api/models/');


  if (vehicleModelResponse.ok) {
    vehicleModelData = await vehicleModelResponse.json()
    // console.log('Vehicle Data:', vehicleModelData);
  } else {
    console.error(vehicleModelResponse);
  }
  
  let vehicleManufacturerData;
  const vehicleManufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');

  if (vehicleManufacturerResponse.ok) {
    vehicleManufacturerData = await vehicleManufacturerResponse.json()
  } else {
    console.error(vehicleManufacturerResponse);
  }

  let automobileData;
  const automobileResponse = await fetch('http://localhost:8100/api/automobiles/')
  if (automobileResponse.ok) {
    automobileData = await automobileResponse.json();
    // console.log(automobileData)
  } else {
    console.error(automobileResponse);
  }

  let salesPersonData;
  const salesPersonResponse = await fetch('http://localhost:8090/api/salesperson/');
  if (salesPersonResponse.ok) {
    salesPersonData = await salesPersonResponse.json()
  } else {
    console.error(salesPersonResponse);
  }

  let customerData;
  const customerResponse = await fetch('http://localhost:8090/api/customer/');
  if (customerResponse.ok) {
    customerData = await customerResponse.json()
  } else {
    console.error(customerResponse);
  }

  let appointmentData;
  const appointmentResponse = await fetch("http://localhost:8080/api/appointments");
  if (appointmentResponse.ok) {
    appointmentData = await appointmentResponse.json();
  } else {
    console.error(appointmentResponse)
  }

  let salesRecordData;
  const salesRecordResponse = await fetch("http://localhost:8090/api/salesrecord");
  if (appointmentResponse.ok) {
    salesRecordData = await salesRecordResponse.json();
  } else {
    console.error(salesRecordResponse)
  }

  root.render(
    <React.StrictMode>
      <App vehicles={vehicleModelData} manufacturers={vehicleManufacturerData} automobiles={automobileData} salespeople={salesPersonData}
      customer={customerData} appointments={appointmentData} salesrecord={salesRecordData} />
    </React.StrictMode>
  );
}
loadInventory();
