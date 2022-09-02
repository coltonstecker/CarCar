import React from 'react';


class ServiceHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            vin: '',
            allAppointments: [],
        }
        this.getAppointmentData = this.getAppointmentData.bind(this);
        this.setVin = this.setVin.bind(this);
        this.searchButtonClick = this.searchButtonClick.bind(this);
    };

    async getAppointmentData() {
        const appointmentUrl = 'http://localhost:8080/api/appointments/all/';
        const appointmentResponse = await fetch(appointmentUrl);
        if (appointmentResponse.ok) {
            const data = await appointmentResponse.json();
            this.setState({allAppointments: data.appointments})
        }
    }

    async componentDidMount() {
        this.getAppointmentData();
    }
    // Use vin to find itself in all appointments
    // set that appointments state to the page to render


    searchButtonClick() {
        for (let appointment of this.state.allAppointments) {
            // console.log(appointment)
            if (appointment["automobile"]["vin"] === this.state.vin) {
                console.log(appointment);
                let tempAppointments = this.state.appointments
                tempAppointments.push(appointment)
                this.setState({appointments: tempAppointments});
                // created an array for our existing matching appointments in state
                // pushed our appointment into the array
                // used our array to set the state
                // map the new array to display the data

            }
        }
    }
    

    // save input to the state as it is being typed
    // search button click => 
    // make api call to get automobile Vin
    // access the vin number from call
    // populate page with the fields from given vin number

    setVin(event) {
        const value = event.target.value;
        this.setState({vin: value})
    }


    render() {
        console.log(this.state.appointments);
        return (
    <div>
        <form>
            <div className="col-sm-10">
            <input onChange={this.setVin} type="search" className="form-control" id="inputEmail3" />
            </div>
            <div className="col-auto">
            <button onClick={this.searchButtonClick} type="button" className="btn btn-primary mb-2">Search VIN</button>
            </div>
        </form>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Vin</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {this.state.appointments.map(appointment => {
            return (
              <tr key={appointment.id}>
                <td>{ appointment.automobile.vin }</td>
                <td>{ appointment.customer_name }</td>
                <td>{ appointment.date}</td>
                <td>{ appointment.time}</td>
                <td>{ appointment.assigned_technician.name}</td>
                <td>{ appointment.reason }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
        )
    }
}

export default ServiceHistory;