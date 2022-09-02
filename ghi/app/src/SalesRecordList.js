import React from 'react';



class SalesRecordList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        salesrecords: [],
        salesperson: [],
        name: "",
      }
      this.salesPersonOnSelect = this.salesPersonOnSelect.bind(this)
      this.setName = this.setName.bind(this)
    };

    async getSalesRecordListData() {
      const url = 'http://localhost:8090/api/salesrecord';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log("Here", data.salesrecords)
        this.setState({salesrecords: data.salesrecords})
      }
    }

    async getSalesPersonList()  {
        const url = 'http://localhost:8090/api/salesperson/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({salesperson: data.salespersons})
        }
    }

    async componentDidMount() {
      this.getSalesRecordListData()
      this.getSalesPersonList()
      this.salesPersonOnSelect()
      // This allows the page to respond quicker

    }

    salesPersonOnSelect(event) {
        for (let record of this.state.salesrecords) {
            // console.log("record",record)
            if (this.state.name === record.salesperson.name) {
                
            }
        }
    }
    setName(event) {
        const value = event.target.value
        this.setState({name: value})
    }
    render() {
      return (
        <div>
            <div className="mb-3">
                <h1>Sales person history</h1>
                <select onChange={this.setName} onSelect={this.salesPersonOnSelect} name="sales_person" id="sales_person" required className="form-select">
                    <option value="">Choose a SalesPerson</option>
                    {this.state.salesperson.map(sales_person => {
                        return (
                            <option key={sales_person.employee_number} value={sales_person.name}>
                                {sales_person.name}
                            </option>
                        );
                    })}
                </select>
            </div>
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
                    .filter(sale => {
                        return this.state.name === "" || sale.salesperson.name === this.state.name
                    })
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
        </div>
      )
    }
}

export default SalesRecordList;