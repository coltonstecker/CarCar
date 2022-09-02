import React from 'react';

class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeNumber: ''
        }

        this.handleName = this.handleName.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        data.employee_number = parseInt(data.employeeNumber, 10);
        delete data.employeeNumber;

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(technicianUrl, fetchConfig);
          if (response.ok) {
              const newTechnician = await response.json();
              this.setState({
                  name: '',
                  employeeNumber: '',
              });
          }
    }

    handleName(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleNumber(event) {
        const value = event.target.value;
        this.setState({employeeNumber: value});
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Enter a Technician</h1>
                <form onSubmit={this.handleSubmit} id="vehicle-manufacturer-form">
                  <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.employeeNumber} onChange={this.handleNumber} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                    <label htmlFor="employee_number">Employee Number</label>
                  </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
        )
    }
}

export default TechnicianForm;