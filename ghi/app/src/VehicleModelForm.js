import React from "react";

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            pictureUrl: '',
            manufacturerId: '',
            manufacturers: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleChangePicture = this.handleChangePicture.bind(this);
        this.handleChangeManufacturer = this.handleChangeManufacturer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);
        data.picture_url = data.pictureUrl;
        data.manufacturer_id = parseInt(data.manufacturer, 10)
        delete data.pictureUrl;
        delete data.manufacturerId
        delete data.manufacturers;

        const vehicleModelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        }
    };
    const response = await fetch(vehicleModelUrl, fetchConfig);
    if (response.ok) {
        const newVehicleModel = await response.json();
        this.setState({
            name: '',
            pictureUrl: '',
            manufacturerId: '',
        });
    }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
      }

      
      handleChangePicture(event) {
        const value = event.target.value;
        this.setState({ pictureUrl: value });
      }
    

    handleChangeManufacturer(event) {
        const value = event.target.value;
        this.setState({ manufacturer: value });
      }


    async componentDidMount() {
        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(manufacturerUrl);
        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers});
        };
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new Vehicle Model</h1>
                <form onSubmit={this.handleSubmit} id="create-conference-form">
                  <div className="form-floating mb-3">
                    <input placeholder="Name" value={this.state.name} onChange={this.handleNameChange} required type="text" name="name" id="name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.pictureUrl} onChange={this.handleChangePicture} placeholder="Picture URL" type="URL" name="picture_url" id="picture_url" className="form-control"/>
                    <label htmlFor="picture_url">Picture URL</label>
                  </div>
                  <div className="mb-3">
                    <select name="manufacturer" value={this.state.manufacturer} onChange={this.handleChangeManufacturer} id="manufacturer" required className="form-select">
                      <option value="">Choose a manufacturer</option>
                      {this.state.manufacturers.map(manufacturer => {
                          return (
                              <option key={manufacturer.href} value={manufacturer.id}>
                                  {manufacturer.name}
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

export default VehicleModelForm;
