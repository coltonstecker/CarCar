import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelForm from './VehicleModelForm';
import VehicleManufacturerForm from './VehicleManufacturerForm';
import VehicleList from './VehicleModelList';
import VehicleManufacturersList from './VehicleManufacturersList';
import AutomobileForm from './AutomobileForm';
import AutomobilesList from './AutomobileList';
import SalesPersonForm from './SalesPersonForm';
import TechnicianForm from './TechnicianForm';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import CustomerForm from './CustomerForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';
import SalesRecordsForm from './SalesRecordForm';
import SalesList from './SalesList';
import SalesRecordList from './SalesRecordList';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage vehicles={props.vehicles} />} />
          <Route path="new/model" element={<VehicleModelForm />} />
          <Route index path="list/models" element={<VehicleList vehicles={props.vehicles} />}/>
          <Route path="salesperson" element={<SalesPersonForm />} />
          <Route path="sales" element={<SalesList />} />
          <Route path="customer" element={<CustomerForm />} />
          <Route path="salesrecord" element={<SalesRecordsForm />} />
          <Route path="salesrecordlist" element={<SalesRecordList />} />
          <Route path="/vehicles">
            <Route path="/vehicles/manufacturers/new" element={<VehicleManufacturerForm />} />
            <Route path="/vehicles/manufacturers" element={<VehicleManufacturersList manufacturers={props.manufacturers}/>} />
            <Route path="/vehicles/automobiles/new" element={<AutomobileForm />} />
            <Route path="/vehicles/automobiles/list" element={<AutomobilesList automobiles={props.automobiles}/>} />
          </Route>
          <Route path="/services">
            <Route path="technicians/" element={<TechnicianForm />} />
            <Route path="appointments/" element={<ServiceAppointmentForm />} />
            <Route path="appointments/list" element={<AppointmentList appointments={props.appointments}/>} />
            <Route path="history/" element={<ServiceHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
