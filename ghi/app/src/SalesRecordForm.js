import React from 'react';

class SalesRecordsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            automobiles: [],
            salesPerson: [],
            customer: [],
            sale_price: "0",
        };
        this.handleAutomobile = this.handleAutomobile.bind(this);
        this.handleSalesPerson = this.handleSalesPerson.bind(this);
        this.handleCustomer = this.handleCustomer.bind(this);
        this.handleSalePrice = this.handleSalePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log("data", data)

        let salesRecordData = data;
        salesRecordData.sale_price = parseInt(salesRecordData.sale_price)
        salesRecordData.customer = parseInt(salesRecordData.purchasers)
        salesRecordData.salesperson = parseInt(salesRecordData.salesPeople)
        delete salesRecordData.purchasers;
        delete salesRecordData.salesPeople;
        delete salesRecordData.automobiles;
        // salesRecordData.sale_price = parseInt(salesRecordData.sale_price)
        console.log("data 2", salesRecordData)
        const salesRecordUrl = 'http://localhost:8090/api/salesrecord/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(salesRecordUrl, fetchConfig);
          if (response.ok) {
              this.setState({
                automobiles: [],
                salesPerson: [],
                customer: [],
                sale_price: "",
              })
          }
    }



    async componentDidMount() {
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const autoresponse = await fetch(automobileUrl);
        if (autoresponse.ok) {
            const data = await autoresponse.json();
            console.log("auto data", data)
            this.setState({automobiles: data.autos})
        }
        const salesPersonUrl = 'http://localhost:8090/api/salesperson/';
        const salesresponse = await fetch(salesPersonUrl);
        if (salesresponse.ok) {
            
            const data = await salesresponse.json();
            console.log("sales data", data)
            
            this.setState({salesPerson: data.salespersons})
            // console.log("salesPerson", this.state.salesPerson[0].name)
            // this.state.salesPerson.map(s =>{console.log(s.name)})
        }
        const customerUrl = 'http://localhost:8090/api/customer/';
        const custresponse = await fetch(customerUrl);
        if (custresponse.ok) {
            const data = await custresponse.json();
            console.log("cust data", data)
            this.setState({customer: data.customers})
        }
    }

    handleAutomobile(event) {
        const value = event.target.value;
        console.log("type", typeof(value))
        this.setState({automobile: value});
    }

    handleSalePrice(event) {
        const value = event.target.value;
        this.setState({sale_price: value});
    }
    
    handleSalesPerson(event) {
      const value = event.target.value;
      console.log("type", typeof(value))
      const salesPeople = value.split(',')
        this.setState({salesPeople: value});
    }

    handleCustomer(event) {
        const value = event.target.value;
        const purchasers = value.split(',')
        this.setState({purchasers: value});
    }
    


    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Record a new sale</h1>
                <form onSubmit={this.handleSubmit} id="create-conference-form">
                  <div className="mb-3">
                    <select onChange={this.handleAutomobile} name="automobile" id="automobile" required className="form-select">
                      <option value="">Choose an Automobile</option>
                      {this.state.automobiles.map(automobile => {
                          return (
                              <option key={automobile.id} value={automobile.id}>
                              {automobile.model.name}
                              </option>
                          );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleSalesPerson} name="sales_person" id="sales_person" required className="form-select">
                      <option value="">Choose a SalesPerson</option>
                      {this.state.salesPerson.map(sales_person => {
                          return (
                              <option key={sales_person.employee_number} value={sales_person.employee_number}>
                                  {sales_person.name}
                              </option>
                          );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleCustomer} name="customer" id="customer" required className="form-select">
                      <option value="">Choose a Customer</option>
                      {this.state.customer.map(customers => {
                          return (
                              <option key={customers.phone_number} value={customers.phone_number}>
                                  {customers.name}
                              </option>
                          );
                      })}
                    </select>
                  </div>
                  <div className="form-floating mb-3">
                    <input placeholder="Sale_price" value={this.state.sale_price} onChange={this.handleSalePrice} required type="number" name="sale_price" id="sale_price" className="form-control"/>
                    <label htmlFor="sale_price">Sale Price</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}


export default SalesRecordsForm;