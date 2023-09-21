import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Header = () => {
  const navigate = useNavigate();
  const username = window.sessionStorage.getItem("user_name");
  const alert = useAlert();

  function logout() {
    const isUser = window.sessionStorage.getItem("user_level_id") == 2;
    const user = isUser ? "/UserLogin" : "/Login";
    alert.success("You have logged out Successfully.");

    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("user_id");
    window.sessionStorage.removeItem("user_level_id");
    window.sessionStorage.removeItem("user_name");
    navigate(user, {
      state: {
        msg: "Your have logged out successully !!!.",
        error_type: "alert-success",
      },
    });
  }

  console.log("Session Storage : ");
  console.log(window.sessionStorage.getItem("user"));

  const adminLinks = (
    <ul className="nav navbar-nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/About">About</Link>
      </li>
      <li>
        <Link to="/Dashboard">Dashboard</Link>
      </li>
      <li className="dropdown">
        <a href="##" data-toggle="dropdown" className="dropdown-toggle">
          Add New<b className="caret"></b>
        </a>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" to="/register">
              Add New Employee
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/salary-add">
              Add New Salary
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/AddDepartments">
              Add New Department
            </Link>
          </li>
        </ul>
      </li>
      <li className="dropdown">
        <a href="#1" data-toggle="dropdown" className="dropdown-toggle">
          Reports<b className="caret"></b>
        </a>
          <ul className="dropdown-menu">
            <li>
          <Link to="/admin-details">Admin Details</Link>
        </li>
          <li>
            <Link to="/user-report">Employee Report</Link>
          </li>
          <li>
        <Link to="/departments">Departments</Link>
          </li>
          <li>
            <Link to="/salary-report">Salary Report</Link>
          </li>
          <li>
            <Link to="/leave-report">Leave Report</Link>
          </li>
          <li>
            <Link to="/feedback-report">Feedback Report</Link>
          </li>
        </ul>
      </li>
      <li>
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  const agentLinks = (
    <ul className="nav navbar-nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/About">About</Link>
      </li>
      <li>
        <Link to="/Dashboard">Dashboard</Link>
      </li>
      <li className="dropdown">
        <a href="#2" data-toggle="dropdown" className="dropdown-toggle">
          {username}
          <b className="caret"></b>
        </a>
        <ul className="dropdown-menu">
          <li>
            <Link to="/location-add"></Link>
          </li>
          <li>
            <Link to="/salary-report">View Salarys</Link>
          </li>
          <li>
            <Link to={"/user-add/" + window.sessionStorage.getItem("user_id")}>
              My Account
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  const usersLinks = (
    <ul className="nav navbar-nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/About">About</Link>
      </li>
      <li>
        <Link to="/Dashboard">Dashboard</Link>
      </li>
      <li className="dropdown">
        <a href="#3" data-toggle="dropdown" className="dropdown-toggle">
          {username}
          <b className="caret"></b>
        </a>
        <ul className="dropdown-menu">
          <li>
            <Link to="/leave-add">Apply Leave</Link>
          </li>
          <li>
            <Link to="/salary-report">My Salary</Link>
          </li>
          <li>
            <Link to="/leave-report">My Leaves Report</Link>
          </li>
          <li>
            <Link to={"/user-add/" + window.sessionStorage.getItem("user_id")}>
              My Account
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav navbar-nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/About">About</Link>
      </li>
      <li>
        <Link to="/Login">Admin Login</Link>
      </li>
      <li>
        <Link to="/UserLogin">User Login</Link>
      </li>
      <li>
        <Link to="/feedback">Feedback</Link>
      </li>
      <li>
        <Link to="/Team">Team</Link>
      </li>
    </ul>
  );
  return (
    <header>
      <div className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">
              Employee Management System
            </Link>
          </div>
          <div className="navbar-collapse collapse ">
            {
              <Fragment>
                {window.sessionStorage.getItem("user_level_id") == "1"
                  ? adminLinks
                  : window.sessionStorage.getItem("user_level_id") == "2"
                  ? usersLinks
                  : window.sessionStorage.getItem("user_level_id") == "3"
                  ? agentLinks
                  : guestLinks}
              </Fragment>
            }
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
