import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import { PropTypes } from "prop-types";
import {
  useNavigate,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";

import { setAlert } from "../../actions/alert";
import config from "../../utils/config";


const DepartmentAdd = ({ setAlert, user, isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();

  

  let page_heading = "Add Department";

  if (window.sessionStorage.getItem("user_level_id") === "1") {
    page_heading = "Add Department";
  }

  // Function htmlFor edit //
  let { id } = useParams();

  

  // Alert message htmlFor displaying success and error ////
  const [message, setMessage] = useState({
    show_message: false,
    error_type: "",
    msg: "",
  });


  // Creating FormData Form elements ////
  const [formData, setFormData] = useState({
    department_id:"",
    department_name:"",
  });

  function reset() {
    setFormData({
      
      department_id:"",
      department_name:"",
      
    });
  }

  // var isUser = window.sessionStorage.getItem("user_level_id") === "2";

  useEffect(() => {
    if (location.state != null) {
      setMessage({
        show_message: true,
        error_type: location.state.error_type,
        msg: location.state.msg,
      });
    }

    if (id) {
      axios.get(`${config.api_url}/department/${id}`).then((res) => {
        console.log("Edit Data");
        console.log(res.data);
        setFormData(res.data);
      });
    }
  },[id, location.state]);

  // Handlinng Change Event
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handling Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    
    // On submit //
    if (id) {
      axios({
        method: "put",
        url: `${config.api_url}/department/${id}`,
        data: formData,
      })
        .then(function (response) {
          //handle success
          console.log("Success  : ");
          console.log(response);
          setMessage({
            show_message: true,
            error_type: "alert-success",
            msg: "Department Updated Successfully !!!",
          });
          navigate("/departments");
        })
        .catch(function (response) {
          //handle error
          console.log("Error  : ");
          console.log(response);
        });
    } else {
      // Check department Already Exits ///
      axios({
        method: "get",
        url: `${config.api_url}/departments/check-department-exists/${formData.department_name}`,
      }).then(function (user_data) {
        console.log("user data");
        if (user_data.data.length === 0) {
          axios({
            method: "post",
            url: `${config.api_url}/department`,
            data: formData,
          })
            .then(function (response) {
              //handle success
              console.log("Success  : ");
              console.log(response);
              alert.success("Department Name has been successfully Added.");
              navigate("/departments");
               
            })
            .catch(function (response) {
              //handle error
              console.log("Error  : ");
              console.log(response);
            });
        } else {
          alert.error("Department Name already exists.");
          setMessage({
            show_message: true,
            error_type: "alert-danger",
            msg: "Department Name already exists. Kindly choose another Department Name !!!",
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
                      </div>
                        <div className="row">
                        
                          <div className="col">
                            <label htmlFor="name">Department Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="department_name"
                              required
                              name="department_name"
                              value={formData.department_name}
                              onChange={(e) => onChange(e)}
                            />
                         
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
                        <Link to="/departments">
                          <button type="submit" className="btn btn-default">
                            Back
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

DepartmentAdd.propTypes = {
  setAlert: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(DepartmentAdd);
