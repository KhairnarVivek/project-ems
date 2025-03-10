import React, { useState, useEffect } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import config from "../../utils/config";
import { useAlert } from "react-alert";

const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();

  // Alert message for displaying success and error ////
  const [message, setMessage] = useState({
    show_message: false,
    error_type: "",
    msg: "",
  });

  // Set message on the loading of page //
  useEffect(() => {
    if (location.state != null) {
      setMessage({
        show_message: true,
        error_type: location.state.error_type,
        msg: location.state.msg,
      });
    }
  }, []);

  const [formData, setFormData] = useState({
    login_email: "",
    login_password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handling Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    // On submit //
    axios({
      method: "post",
      url: `${config.api_url}/user-login`,
      data: formData,
    })
      .then(function (response) {
        //handle success
        console.log("Success  : ");

        console.log(response.data.user_id);
        if (response.data.user_id) {
          console.log("I entered");
          window.sessionStorage.setItem("user", response.data);
          window.sessionStorage.setItem("user_id", response.data.user_id);
          window.sessionStorage.setItem(
            "user_level_id",
            response.data.user_level_id
          );
          window.sessionStorage.setItem(
            "user_name",
            response.data.user_first_name + " " + response.data.user_last_name
          );
          // checks if admin
          if (response.data.user_level_id == 1) {
            alert.error("You are trying to login through User-Login.");
            setMessage({
              show_message: true,
              error_type: "alert-danger",
              msg: "You are trying to login through User-Login.",
            });
            return;
          }
          navigate("/dashboard");
        } else {
          alert.error("Invalid Username or Password");

          setMessage({
            show_message: true,
            error_type: "alert-danger",
            msg: "Invalid Username or Password. Kindly try again !!!!",
          });
        }
      })
      .catch(function (response) {
        setMessage({
          show_message: true,
          error_type: "alert-danger",
          msg: "Invalid Username or Password. Kindly try again !!!!",
        });
        //handle error
        console.log("Error Response  : ");
        console.log(response);
      });
  };

  return (
    <section className="container-container">
      <section id="inner-headline">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="pageTitle">User Login</h2>
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
                      <h2 className="h2c">Login to Your Account</h2>
                    </div>
                    <br />
                  </div>
                </div>
                <section className="vh-100">
                  <div className="d-flex justify-content-center align-items-center h-100 frmc">
                    {message.show_message ? (
                      <div
                        className={"alert " + message.error_type}
                        role="alert"
                      >
                        {message.msg}
                      </div>
                    ) : (
                      ""
                    )}
                    <form className="form-horizontal" onSubmit={onSubmit}>
                      <div className="form-group">
                        <label className="control-label col-sm-2">Email:</label>
                        <div className="col-sm-10">
                          <input
                            type="email"
                            name="login_email"
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            required
                            placeholder="Enter email"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label col-sm-2">
                          Password:
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="password"
                            name="login_password"
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            required
                            id="pwd"
                            placeholder="Enter password"
                          />
                        </div>
                      </div>
                      {/* <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <div className="checkbox">
                            <label><input type="checkbox" /> Remember me</label>
                          </div>
                        </div>
                      </div> */}
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button type="submit" className="btn btn-default">
                            Submit
                          </button>
                        </div>
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

export default Login;
