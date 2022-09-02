import React from 'react';

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            vin: '',
            year: '',
            models: [],
        };
        this.handleColor = this.handleColor.bind(this);
        this.handleVIN = this.handleVIN.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVehicleModel = this.handleVehicleModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        let automobileData = data;
        automobileData.model_id = parseInt(automobileData.model, 10)
        delete automobileData.model;
        delete automobileData.models;
        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(automobileData),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(automobileUrl, fetchConfig);
          if (response.ok) {
              const newAutomobile = await response.json();
              console.log(newAutomobile);
              this.setState({
                  color: '',
                  vin: '',
                  year: '',
                  models: []
              })
          }
    }

    async componentDidMount() {
        const vehicleModelUrl = 'http://localhost:8100/api/models/';
        const response = await fetch(vehicleModelUrl);
        if (response.ok) {
            const data = await response.json();
            this.setState({models: data.models})
        }
    }

    handleColor(event) {
        const value = event.target.value;
        this.setState({color: value});
    }

    handleYearChange(event) {
        const value = event.target.value;
        this.setState({year: value});
    }

    handleVIN(event) {
        const value = event.target.value;
        this.setState({vin: value});
    }

    handleVehicleModel(event) {
        const value = event.target.value;
        this.setState({model: value});
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Automobile</h1>
                <form onSubmit={this.handleSubmit} id="create-shoe-form">
                  <div className="form-floating mb-3">
                    <input value={this.state.color} onChange={this.handleColor} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.year} onChange={this.handleYearChange} placeholder="Year" required type="number" name="year" id="year" className="form-control"/>
                    <label htmlFor="year">Year</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.vin} onChange={this.handleVIN} placeholder="VIN" required type="text" name="VIN" id="VIN" className="form-control"/>
                    <label htmlFor="VIN">VIN</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleVehicleModel} name="model" id="model" required className="form-select">
                      <option value="">Select a Model</option>
                      {this.state.models.map(model => {
                          return (
                              <option key={model.id} value={model.id}>
                              {model.name}
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
export default AutomobileForm;