function AutomobilesList(props) {
    console.log("automobile list form", props);
    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Vin</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {props.automobiles.autos.map(automobile => {
            return (
              <tr key={automobile.href}>
                <td>{ automobile.vin }</td>
                <td>{ automobile.color }</td>
                <td>{ automobile.year}</td>
                <td>{ automobile.model.name}</td>
                <td>{ automobile.model.manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
}

export default AutomobilesList;