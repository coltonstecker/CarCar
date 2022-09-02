function MainPage(props) {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">CarGoFast</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
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

export default MainPage;
