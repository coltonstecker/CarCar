function VehicleList(props) {
    console.log("listForm", props);
    return (
      <div className="container">
        <h2 className="display-5 fw-bold">Vehicle Models</h2>
        <div className="row">
          {props.vehicles.models.map(vehicle => {
            return (
              <div key={vehicle.id} className="col">
                <div className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">{vehicle.manufacturer.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {vehicle.name}
                    </h6>
                    <p className="card-text">
                      <img alt="" src={vehicle.picture_url} className="card-img-top" />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  export default VehicleList;