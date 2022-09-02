import React from 'react';

class ServiceAppointmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            vin: '',
            reason: '',
            date: '',
            time: '',
            technicians: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
        this.handleVin = this.handleVin.bind(this);
        this.handleReason = this.handleReason.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleTechnician = this.handleTechnician.bind(this);
    }

    async handleSubmit(event) {
      event.preventDefault();
      const data = {...this.state};
      console.log(data);
      data.customer_name = data.customerName;
      data.technician_number = parseInt(data.technician, 10);
      delete data.customerName;
      delete data.technician;
      delete data.technicians

      const appointmentUrl = 'http://localhost:8080/api/appointments/';
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(appointmentUrl, fetchConfig);
      if (response.ok) {
        const newAppointment = await response.json();
        console.log(newAppointment);
        this.setState({
          customerName: '',
            vin: '',
            reason: '',
            date: '',
            time: '',
            technicians: []
        })
      }

    }

    async componentDidMount() {
        const techUrl = 'http://localhost:8080/api/technicians/';
        const techResponse = await fetch(techUrl);
        if (techResponse.ok) {
            const data = await techResponse.json();
            this.setState({technicians: data.technicians})
        }
    }

    handleCustomerNameChange(event) {
      const value = event.target.value;
      this.setState({ customerName: value})
    }

    handleVin(event) {
      const value = event.target.value;
      this.setState({ vin: value })
    }

    handleReason(event) {
      const value = event.target.value;
      this.setState({ reason: value})
    }

    handleDate(event) {
      const value = event.target.value;
      this.setState({ date: value})
    }

    handleTime(event) {
      const value = event.target.value;
      this.setState({ time: value})
    }

    handleTechnician(event) {
      const value = event.target.value;
      this.setState({ technician: value})
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new service appointment</h1>
                <form onSubmit={this.handleSubmit} id="create-conference-form">
                  <div className="form-floating mb-3">
                    <input placeholder="Name" value={this.state.customerName} onChange={this.handleCustomerNameChange} required type="text" name="customer_name" id="customer_name" className="form-control"/>
                    <label htmlFor="customer_name">Customer Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input placeholder="Vin" value={this.state.vin} onChange={this.handleVin} required type="text" name="vin" id="vin" className="form-control"/>
                    <label htmlFor="vin">Vin Number</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.reason} onChange={this.handleReason} placeholder="Reason" type="text" name="reason" id="reason" className="form-control"/>
                    <label htmlFor="reason">Reason</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.date} onChange={this.handleDate} placeholder="Date" type="date" name="date" id="date" className="form-control"/>
                    <label htmlFor="date">Date</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.time} onChange={this.handleTime} placeholder="time" type="time" name="time" id="time" className="form-control"/>
                    <label htmlFor="time">Time</label>
                  </div>
                  <div className="mb-3">
                    <select name="technician" value={this.state.technician} onChange={this.handleTechnician} id="technician" required className="form-select">
                      <option value="">Select a Technician</option>
                      {this.state.technicians.map(technician => {
                          return (
                              <option key={technician.id} value={technician.employee_number}>
                                  {technician.name}
                              </option>
                          );
                      })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}


export default ServiceAppointmentForm;