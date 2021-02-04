import { Component } from "react";
import Container from "./Container";
import Card from "./Card";
import Header from "./Header"
import SearchForm from "./SearchForm";
import API from "../utils/API";

export default class EmployeeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: {}
    };
  }

  renderEmployeeRows() {
    const data = this.state.employeeData;

    console.log("data", data);

    if (data.length > 0) {
      //const allEmployeeTrs = 
      return data.map((datum) => {
        return (
          <tr key={datum.login.uuid}>
            <td className="employee-image">
              <img src={datum.picture.medium}/>
            </td>
            <td className="employee-name">
              {datum.name.first} {datum.name.last}
            </td>
            <td>
              {datum.phone}
            </td>
            <td>
              <a href={"mailto:" + datum.email}>{datum.email}</a>
            </td>
            <td>
              {datum.dob.date}
            </td>
          </tr>
        );
      });
      //return allEmployeeTrs 
    }

    return "";
  }

  componentDidMount() {
    API.getEmployees()
      .then(res => {
        console.log("**********res: ",res.data.results);
        //update the state and trigger rerender
        this.setState({ employeeData: res.data.results })
      })
      .catch(err => console.log(err));
  };

  // handleInputChange = event => {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // // When the form is submitted, search the OMDB API for the value of `this.state.search`
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   this.searchEmployees(this.state.search);
  // };

  
//sort()
//onChange={this.handleSearchInputChange}
  render() {
    return (
      <Container>
        <input className="search" />
        <table>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>DOB</th>
          </tr>
          {this.renderEmployeeRows()}
        </table>
        {/* <SearchForm></SearchForm> */}
        {/* <Card heading="Search">
          <SearchForm
            value={this.state.search}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Card> */}
      </Container>
    );
  }


}