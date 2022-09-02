import React from 'react';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            phone_number: '',
        };
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);

   }

   async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.phone_number = parseInt(data.phone_number)
    console.log("data", data)
    const customerUrl = 'http://localhost:8090/api/customer/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
         'Content-Type': 'application/json',
        }
    };
    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
        const newCustomer = await response.json();
        console.log(newCustomer);

        const cleared = {
            name: '',
            address: '',
            phone_number: '',
        };
        this.setState(cleared);
    }
}

    handleName(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleAddress(event) {
        const value = event.target.value;
        this.setState({address: value});
    }

    handlePhoneNumber(event) {
        const value = event.target.value;
        this.setState({phone_number: value});
    }


  render() {
    return (
        <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a customer</h1>
                <form onSubmit={this.handleSubmit} id="customer-form">
                  <div className="form-floating mb-3">
                    <input value={this.state.name} onChange={this.handleName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.address} onChange={this.handleAddress} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                    <label htmlFor="address">Customer address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.phone_number} onChange={this.handlePhoneNumber} placeholder="Phone_number" required type="number" name="phone_number" id="phone_number" className="form-control" />
                    <label htmlFor="phone_number">Customer phone number</label>
                  </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerForm;