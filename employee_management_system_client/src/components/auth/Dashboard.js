import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { PropTypes } from "prop-types";
import { register } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const navigate = useNavigate();
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
    // navigate("/login");
  }

  const adminLinks = (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/About">About</Link>
      </li>
      <li>
        <Link to="/departments">Departments</Link>
      </li>
      <li>
        <Link to="/admin-details">Admin Details</Link>
      </li>
      <li>
        <Link to="/user-report">Employee Details</Link>
      </li>
      <li>
        <Link to="/salary-report">Salary Details</Link>
      </li>
      <li>
        <Link to="/leave-report">Leave Details</Link>
      </li>
      <li>
        <Link to="/feedback-report">Feedback Report</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  const customerLinks = (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/About">About</Link>
      </li>
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
      <li>
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <section className="container-container">
      <section id="inner-headline">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2
                className="pageTitle"
                onClick={() => {
                  alert.success("It's ok now!");
                }}
              >
                <Fragment>
                  {window.sessionStorage.getItem("user_level_id") == "1"
                    ? "Admin Dashboard"
                    : window.sessionStorage.getItem("user_level_id") == "2"
                    ? " Employee Dashboard"
                    : ""}
                </Fragment>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section id="content">
        <div className="container">
          <div className="about">
            <section className="features">
              <div className="container">
                <div>
                  <div>
                    <div>
                      <h2 className="h2c">
                        <Fragment>
                          {window.sessionStorage.getItem("user_level_id") == "1"
                            ? "Admin Dashboard"
                            : window.sessionStorage.getItem("user_level_id") ==
                              "2"
                            ? " Employee Dashboard"
                            : ""}
                        </Fragment>
                      </h2>
                    </div>
                    <br />
                  </div>
                </div>
                <section className="vh-100">
                  <div className="row">
                    <div className="col-sm-6">
                      <div id="login-home">
                        {
                          <Fragment>
                            {window.sessionStorage.getItem("user_level_id") ==
                            "1"
                              ? adminLinks
                              : window.sessionStorage.getItem(
                                  "user_level_id"
                                ) == "2"
                              ? customerLinks
                              : ""}
                          </Fragment>
                        }
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <img src="/img/home.jpeg" width={420} />
                      <br />
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
