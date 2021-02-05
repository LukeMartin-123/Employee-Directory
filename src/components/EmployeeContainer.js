import { Component } from "react";
import Container from "./Container";
import SearchForm from "./SearchForm";
import API from "../utils/API";

export default class EmployeeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: {},
      filteredEmployees: [{}]
    };
  }

  renderEmployeeRows() {
    const data = this.state.employeeData;

    if (data.length > 0) {
      //const allEmployeeTrs = 
      return data.map((datum) => {
        return (
          <tr key={datum.login.uuid}>
            <td className="employee-image">
              <img src={datum.picture.medium} />
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
        //update the state and trigger rerender
        this.setState({
          employeeData: res.data.results,
          filteredEmployees: res.data.results
        })

      })
      .catch(err => console.log(err));
  };


  handleSearchChange = event => {
    // Getting the value and name of the input which triggered the change
    const filter = event.target.value;
    const filteredList = this.state.employeeData.filter(item => {
      let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
      // Updating the input's state
    });
    this.setState({ filteredEmployees: filteredList });

  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    this.setState({
      employeeData: {}
    });
  };

  //sort()
  //onChange={this.handleSearchInputChange}
  render() {
    return (
      <Container>
        <SearchForm search={this.handleSearchChange}>

        </SearchForm>
        <table>
          <tbody>
            <th>Image</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>DOB</th>
          </tbody>
          {this.renderEmployeeRows()}

        </table>


      </Container>
    );
  }


}