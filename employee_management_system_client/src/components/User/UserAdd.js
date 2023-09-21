import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  useNavigate,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { PropTypes } from "prop-types";
import axios from "axios";
import config from "../../utils/config";
import { useAlert } from "react-alert";

const UserAdd = ({ setAlert, user, isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();

  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  const maxDate = today.toISOString().split("T")[0];

  let page_heading = "Employee Registrations";

  if (window.sessionStorage.getItem("user_level_id") === "2") {
    page_heading = "My Account";
  }

  // Function htmlFor edit //
  let { id } = useParams();

  const [roleDropDown, setroleDropDown] = useState([
    {
      roles_id: "",
      roles_name: "",
    },
  ]);

  // Alert message htmlFor displaying success and error ////
  const [message, setMessage] = useState({
    show_message: false,
    error_type: "",
    msg: "",
  });

  const [countryDropDown, setCountryDropDown] = useState([
    {
      country_id: "",
      country_name: "",
    },
  ]);

  const [departmentDropDown, setDepartmentDropDown] = useState([
    {
      department_id: "",
      department_name: "",
    },
  ]);

  const [stateDropDown, setStateDropDown] = useState([
    {
      state_id: "",
      state_name: "",
    },
  ]);

  // Creating FormData Form elements ////
  const [formData, setFormData] = useState({
    user_id: "",
    department_id:"",
    user_level_id: "",
    user_email: "",
    user_password: "",
    user_confirm_password: "",
    user_first_name: "",
    user_last_name: "",
    user_dob: "",
    user_address: "",
    user_city: "",
    user_state: "",
    user_country: "",
    user_mobile: "",
    user_nationalty: "",
  });

  function reset() {
    setFormData({
      user_id: "",
      department_id:"",
      user_level_id: "",
      user_email: "",
      user_password: "",
      user_confirm_password: "",
      user_first_name: "",
      user_last_name: "",
      user_dob: "",
      user_address: "",
      user_city: "",
      user_state: "",
      user_country: "",
      user_mobile: "",
      user_nationalty: "",
    });
  }

  var isUser = window.sessionStorage.getItem("user_level_id") === "2";
  var isAdmin = window.sessionStorage.getItem("user_level_id") === "1";

  useEffect(() => {
    if (location.state != null) {
      setMessage({
        show_message: true,
        error_type: location.state.error_type,
        msg: location.state.msg,
      });
    }

    if (id) {
      axios.get(`${config.api_url}/user/${id}`).then((res) => {
        console.log("Edit Data");
        console.log(res.data);
        setFormData(res.data);
      });
    }

    // Get Department Dropdown
    axios.get(`${config.api_url}/departments`).then((res) => {
      console.log(res.data);
      setDepartmentDropDown(res.data);
    });


    // Get Country Dropdown
    axios.get(`${config.api_url}/countries`).then((res) => {
      console.log(res.data);
      setCountryDropDown(res.data);
    });

    // Get State Dropdown
    axios.get(`${config.api_url}/states`).then((res) => {
      console.log(res.data);
      setStateDropDown(res.data);
    });

    // Get Blood Group Dropdown
    axios.get(`${config.api_url}/roles`).then((res) => {
      setroleDropDown(res.data);
    });
  }, [id, location.state]);

  // Handlinng Change Event
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handling Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.user_password !== formData.user_confirm_password) {
      console.log(
        formData.user_password + " AND " + formData.user_confirm_password
      );
      setMessage({
        show_message: true,
        error_type: "alert-danger",
        msg: "Password and Confirm Password is not matching. Kindly re-enter !!!",
      });
      return 0;
    }
    // On submit //
    if (id) {
      axios({
        method: "put",
        url: `${config.api_url}/user/${id}`,
        data: formData,
      })
        .then(function (response) {
          //handle success
          console.log("Success  : ");
          console.log(response);
          setMessage({
            show_message: true,
            error_type: "alert-success",
            msg: "Your Account Updated Successfully !!!",
          });
          navigate("/user-add/" + id);
        })
        .catch(function (response) {
          //handle error
          console.log("Error  : ");
          console.log(response);
        });
    } else {
      // Check User Email Already Exits ///
      axios({
        method: "get",
        url: `${config.api_url}/user/check-user-exits/${formData.user_email}`,
      }).then(function (user_data) {
        console.log("user data");
        if (user_data.data.length === 0) {
          axios({
            method: "post",
            url: `${config.api_url}/user`,
            data: formData,
          })
            .then(function (response) {
              //handle success
              console.log("Success  : ");
              console.log(response);
              alert.success("An account has been successfully registered.");
              navigate("/user-report");
            })
            .catch(function (response) {
              //handle error
              console.log("Error  : ");
              console.log(response);
            });
        } else {
          alert.error("Email ID already exists.");
          setMessage({
            show_message: true,
            error_type: "alert-danger",
            msg: "Email ID already exists. Kindly choose another email ID or login !!!",
          });
        }
      });
    }
  };

  return (
    <section className="container-container">
      <section id="inner-headline">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="pageTitle">{page_heading}</h2>
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
                      <h2 className="h2c">{page_heading}</h2>
                    </div>
                    <br />
                  </div>
                </div>
                <section className="vh-100">
                  {message.show_message ? (
                    <div className={"alert " + message.error_type} role="alert">
                      {message.msg}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="lgfrm">
                    <form onSubmit={onSubmit} className="form-horizontal">
                      <div>
                        <div className="row">
                          <div className="col">
                            <label htmlFor="name">Email ID</label>
                            <input
                              type="email"
                              className="form-control"
                              id="user_email"
                              required
                              name="user_email"
                              value={formData.user_email}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="name">Register As</label>
                            <select
                              name="user_level_id"
                              value={formData.user_level_id}
                              onChange={(e) => onChange(e)}
                              className="form-control"
                              required
                              disabled={isUser}
                            >
                              <option>Register As</option>
                              {roleDropDown.map((option, idx) => (
                                <option key={idx} value={option.roles_id}>
                                  {option.roles_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col">
                            <label htmlFor="name">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="user_password"
                              required
                              name="user_password"
                              value={formData.user_password}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="name">Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="user_confirm_password"
                              required
                              name="user_confirm_password"
                              value={formData.user_confirm_password}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label htmlFor="name">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="user_first_name"
                            required
                            name="user_first_name"
                            value={formData.user_first_name}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="name">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="user_last_name"
                            required
                            name="user_last_name"
                            value={formData.user_last_name}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label htmlFor="name">Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            id="user_dob"
                            required
                            name="user_dob"
                            value={formData.user_dob}
                            onChange={(e) => onChange(e)}
                            min="1990-01-01"
                            max={maxDate}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="name">Mobile</label>
                          <input
                            type="text"
                            className="form-control"
                            id="user_mobile"
                            required
                            name="user_mobile"
                            maxLength={10}
                            value={formData.user_mobile}
                            onInput={(e) => {
                              const inputValue = e.target.value;
                              const numericValue = inputValue.replace(
                                /[^0-9]/g,
                                ""
                              );
                              e.target.value = numericValue;
                            }}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>


                      <div className="row">
                        
                          <div className="col">
                            <label htmlFor="name">Nationality</label>
                            <input
                              type="text"
                              className="form-control"
                              id="user_nationalty"
                              required
                              name="user_nationalty"
                              value={formData.user_nationalty}
                              onChange={(e) => onChange(e)}
                            />
                         
                        </div>
                          <div className="col">
                            <label htmlFor="name">Department name</label>
                            <select
                              name="user_department"
                              value={formData.user_department}
                              onChange={(e) => onChange(e)}
                              className="form-control"
                              required
                              disabled={isUser}
                            >
                              <option>Department Name</option>
                              {departmentDropDown.map((option, idx) => (
                                <option key={idx} value={option.department_name}>
                                  {option.department_name}
                                </option>
                              ))}
                            </select>
                          </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label htmlFor="name">Full Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="user_address"
                            required
                            name="user_address"
                            value={formData.user_address}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="name">Current City</label>
                          <input
                            type="text"
                            className="form-control"
                            id="user_city"
                            required
                            name="user_city"
                            value={formData.user_city}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label htmlFor="name">Current State</label>
                          <select
                            required
                            id="user_state"
                            name="user_state"
                            value={formData.user_state}
                            onChange={(e) => onChange(e)}
                            className="form-control"
                          >
                            <option>Select State</option>
                            {stateDropDown.map((option, idx) => (
                              <option key={idx} value={option.state_id}>
                                {option.state_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col">
                          <label htmlFor="name">Origin Country</label>
                          <select
                            id="user_state"
                            required
                            name="user_country"
                            value={formData.user_country}
                            onChange={(e) => onChange(e)}
                            className="form-control"
                          >
                            <option>Select Country</option>
                            {countryDropDown.map((option, id) => (
                              <option key={id} value={option.country_id}>
                                {option.country_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="lgbtn">
                        <button type="submit" className="btn btn-success">
                          Submit
                        </button>
                        &nbsp;&nbsp;
                        <button
                          type="reset"
                          onClick={reset}
                          className="btn btn-danger"
                        >
                          Reset
                        </button>
                        &nbsp;&nbsp;
                        <Link to={`${isUser ? "/Dashboard" : "/user-report"}`}>
                          <button type="submit" className="btn btn-default">
                            Back to Employee Report
                          </button>
                        </Link>
                        &nbsp;&nbsp;
                        <Link to={`${isUser ? "/Dashboard" : "/admin-details"}`}>
                          <button type="submit" className="btn btn-default">
                            Back to Admin Report
                          </button>
                        </Link>

                      </div>
                    </form>
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

UserAdd.propTypes = {
  setAlert: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(UserAdd);
