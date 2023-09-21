import React from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import config from "../../utils/config";

export default class DepartmentDetails extends React.Component {
  state = {
    users: [],
  };

  /**
   * Confirmation Dialogue Implementation
   */
  confirmatioBox = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this record ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteData(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  /**
   * Function for getting lists
   */
  componentDidMount() {
    axios.get(`${config.api_url}/departments`).then((res) => {
      const users = res.data;
      console.log(res.data);
      this.setState({ users });
      console.log(users);
    });
  }

  /**
   * Function for deleting data
   * @param {*} id
   */
  deleteData(id) {
    axios.delete(`${config.api_url}/departments/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
      this.componentDidMount();
    });
  }

  render() {
    return (
      <section className="container-container">
        <section id="inner-headline">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="pageTitle">Department Names</h2>
              </div>
            </div>
          </div>
        </section>
        <section id="content">
          <div className="container content">
            <div>
              <div className="col-md-12">
                <div>
                  <h2 className="h2c">Company's Department Names </h2>
                </div>
                <br />
              </div>
            </div>
            <div>
              <div className="add-button btn btn-success">
                <Link to="/AddDepartments">Add Department</Link>
              </div>
              <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Department No</th>
                    <th scope="col">Departments</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td key={user.department_id}>{user.department_name}</td>
                      <td>
                        <Link to={"/Edit-Departments/" + user.department_id}>
                          <span className="glyphicon glyphicon-edit editi"></span>
                        </Link>
                        &nbsp;&nbsp;
                        <a
                          onClick={() => this.confirmatioBox(user.department_id)}
                          href="#!"
                        >
                          <span className="glyphicon glyphicon-trash deletei"></span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>
    );
  }
}