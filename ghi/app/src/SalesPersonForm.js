import React from 'react';

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_number: '',
        };
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmployeeNumber = this.handleEmployeeNumber.bind(this);

   }

   async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    const salesPersonUrl = 'http://localhost:8090/api/salesperson/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
         'Content-Type': 'application/json',
        }
    };
    const response = await fetch(salesPersonUrl, fetchConfig);
    if (response.ok) {
        const newSalesPerson = await response.json();
        console.log(newSalesPerson);

        const cleared = {
            name: '',
            employee_number: '',
        };
        this.setState(cleared);
    }
}

    handleName(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleEmployeeNumber(event) {
        const value = event.target.value;
        this.setState({employee_number: value});
    }


  render() {
    return (
        <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a salesperson</h1>
                <form onSubmit={this.handleSubmit} id="vehicle-manufacturer-form">
                  <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.employee_number} onChange={this.handleEmployeeNumber} placeholder="Employee_number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                    <label htmlFor="employee_number">Employee Number</label>
                  </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesPersonForm;