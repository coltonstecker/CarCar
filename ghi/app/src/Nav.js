import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarGoFast</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link" to="/vehicles/manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicles/manufacturers/new">Create a manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="list/models">Car Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="new/model">Create a Car Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicles/automobiles/list">Automobiles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/vehicles/automobiles/new">Create an automobile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="salesperson">Create a salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services/technicians">Enter a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="customer">Create a customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="services/appointments">Book a service appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="services/appointments/list">Appointment List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="services/history">Service History</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="salesrecord">Record a sale</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="sales">Sales</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="salesrecordlist">Sales record list</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
