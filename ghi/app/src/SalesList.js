import React from 'react';


class SalesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        salesrecords: [],
      }
    };

    async getSalesRecordData() {
      const url = 'http://localhost:8090/api/salesrecord';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log("Here", data.salesrecords)
        this.setState({salesrecords: data.salesrecords})
      }
    }

    async componentDidMount() {
      this.getSalesRecordData()
      // This allows the page to respond quicker

    }

    render() {
      return (
        <table className="table table-striped">
                <thead>
                   <tr>
                     <th>Salesperson</th>
                     <th>Employee number</th>
                     <th>Customer</th>
                     <th>Vin</th>
                     <th>Sale price</th>
                   </tr>
                 </thead>
                 <tbody>
                   {this.state.salesrecords
                    // .filter(()=>())
                    .map(sale => {
                    return (
                      <tr>
                        <td>{ sale.salesperson.name }</td>
                        <td>{ sale.salesperson.employee_number }</td>
                        <td>{ sale.customer.name }</td>
                        <td>{sale.automobile.vin}</td>
                        <td>{ sale.sale_price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
      )
    }
}

export default SalesList;