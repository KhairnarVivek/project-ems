import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { PropTypes } from "prop-types";
import axios from "axios";
import config from "../../utils/config";
import { useAlert } from "react-alert";

const LeaveAdd = ({ setAlert, leave, isAuthenticated }) => {
  const navigate = useNavigate();
  // Function for edit //

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  const alert = useAlert();

  let { id } = useParams();

  const [userDropDown, setuserDropDown] = useState([
    {
      user_id: "",
      user_name: "",
    },
  ]);

  const [display, setDisplay] = useState(false);

  // Creating FormData Form elements ////
  const [message, setMessage] = useState({
    show_message: false,
    error_type: "",
    msg: "",
  });

  // Creating FormData Form elements ////
  const [formData, setFormData] = useState({
    leave_id: "",
    leave_employee_id: "",
    leave_reason: "",
    leave_description: "",
    leave_from_date: "",
    leave_to_date: "",
    leave_status: "",
    leave_total_days: "",
  });

  const reset = () => {
    setFormData({
      leave_id: "",
      leave_employee_id: "",
      leave_reason: "",
      leave_description: "",
      leave_from_date: "",
      leave_to_date: "",
      leave_status: "",
      leave_total_days: "",
    });
  };

  useEffect(() => {
    if (id) {
      axios.get(`${config.api_url}/leaves/${id}`).then((res) => {
        console.log(res.data);
        setFormData(res.data);
      });
    }

    if (window.sessionStorage.getItem("user_level_id") == "2") {
      formData.leave_status = "Pending";
      formData.leave_employee_id = window.sessionStorage.getItem("user_id");
      setDisplay("none");
    }

    // Get  User Dropdown
    axios.get(`${config.api_url}/user`).then((res) => {
      setuserDropDown(res.data);
    });
  }, [formData.leave_employee_id]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  function totaldays() {
    let fromDate = formData.leave_from_date;
    let toDate = formData.leave_to_date;
    let fromDateObj = new Date(fromDate);
    let toDateObj = new Date(toDate);
    let timeDiff = toDateObj.getTime() - fromDateObj.getTime();
    let dayMilliSeconds = 1000 * 60 * 60 * 24;
    let totalDays = timeDiff / dayMilliSeconds + 1;
    if (totalDays <= 0) {
      alert.error("PLEASE ENTER CORRECT FROM AND TO DATES.");
      return;
    }
    console.log(totalDays);
    totalDays = Math.floor(totalDays);
    console.log(totalDays.toString);

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        leave_total_days: totalDays.toString(),
      };
    });
  }

  useEffect(() => {
    totaldays();
  }, [formData.leave_from_date, formData.leave_to_date]);

  const isUser = window.sessionStorage.getItem("user_level_id") == 2;

  // Handling Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    // On submit //
    if (id) {
      axios({
        method: "put",
        url: `${config.api_url}/leaves/${id}`,
        data: formData,
      })
        .then(function (response) {
          //handle success
          console.log("Success  : ");
          console.log(response);
          alert.success("Leave Updated Successfully!");
          navigate("/leave-report");
          setMessage({
            show_message: true,
            error_type: "alert-success",
            msg: "You have applied for leave !!!",
          });
        })
        .catch(function (response) {
          //handle error
          alert.error("Something went wrong, Please try again later");
          console.log("Error  : ");
          console.log(response);
        });
    } else {
      axios({
        method: "post",
        url: `${config.api_url}/leaves`,
        data: formData,
      })
        .then(function (response) {
          //handle success
          console.log("Success  : ");
          console.log(response);
          alert.success("Leave Added Successfully!");
          navigate("/leave-report");
          setMessage({
            show_message: true,
            error_type: "alert-success",
            msg: "You have applied for leave !!!",
          });
          setFormData({
            leave_id: "",
            leave_employee_id: "",
            leave_reason: "",
            leave_description: "",
            leave_from_date: "",
            leave_to_date: "",
            leave_status: "",
            leave_total_days: 0,
          });
        })
        .catch(function (response) {
          //handle error
          alert.error("Something went wrong, Please try again later");
          console.log("Error  : ");
          console.log(response);
        });
    }
  };

  return (
    <section className="container-container">
      <section id="inner-headline">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="pageTitle">Leave Administration</h2>
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
                      <h2 className="h2c">Leave Administration Form</h2>
                    </div>
                    <br />
                  </div>
                </div>
                {message.show_message ? (
                  <div className={"alert " + message.error_type} role="alert">
                    {message.msg}
                  </div>
                ) : (
                  ""
                )}
                <section className="vh-100">
                  <div className="d-flex justify-content-center align-items-center h-100 frmc">
                    <form className="form-horizontal" onSubmit={onSubmit}>
                      <div className="form-group" style={{ display: display }}>
                        <label
                          className="control-label col-sm-4"
                          htmlFor="email"
                        >
                          Employee :
                        </label>
                        <div className="col-sm-8">
                          <select
                            name="leave_employee_id"
                            value={formData.leave_employee_id}
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            disabled
                          >
                            <option>Select User</option>
                            {userDropDown.map((option) => (
                              <option value={option.user_id}>
                                {option.user_first_name} {option.user_last_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group" style={{ display: display }}>
                        <label
                          className="control-label col-sm-4"
                          htmlFor="email"
                        >
                          Select Status:
                        </label>
                        <div className="col-sm-8">
                          <select
                            name="leave_status"
                            value={formData.leave_status}
                            className="form-control"
                            required
                            onChange={(e) => onChange(e)}
                          >
                            <option disabled>Leave Status</option>
                            <option defaultValue={true} value="Pending">
                              Pending
                            </option>
                            <option value="Approved">Approved</option>
                            <option value="Disapproved">Disapproved</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="control-label col-sm-4"
                          htmlFor="email"
                        >
                          Reasons For Leave:
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            value={formData.leave_reason}
                            onChange={(e) => onChange(e)}
                            name="leave_reason"
                            className="form-control"
                            placeholder="Reason For Leave"
                            disabled={
                              window.sessionStorage.getItem("user_level_id") !==
                              "2"
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="control-label col-sm-4"
                          htmlFor="email"
                        >
                          From Date:
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="date"
                            value={formData.leave_from_date}
                            onChange={(e) => onChange(e)}
                            name="leave_from_date"
                            className="form-control"
                            placeholder="From Date"
                            disabled={
                              window.sessionStorage.getItem("user_level_id") !==
                              "2"
                            }
                            min={minDate}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="control-label col-sm-4"
                          htmlFor="email"
                        >
                          To Date:
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="date"
                            value={formData.leave_to_date}
                            onChange={(e) => onChange(e)}
                            name="leave_to_date"
                            className="form-control"
                            placeholder="To Date"
                            disabled={
                              window.sessionStorage.getItem("user_level_id") !==
                              "2"
                            }
                            min={formData.leave_from_date}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="control-label col-sm-4"
                          htmlFor="email"
                        >
                          Total Days:
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            value={formData.leave_total_days}
                            onChange={(e) => onChange(e)}
                            name="leave_total_days"
                            className="form-control"
                            placeholder="Total Days"
                            defaultValue="Total Days"
                            min={0}
                            disabled
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          className="control-label col-sm-4"
                          htmlFor="email"
                        >
                          Description :
                        </label>
                        <div className="col-sm-8">
                          <textarea
                            value={formData.leave_description}
                            onChange={(e) => onChange(e)}
                            name="leave_description"
                            className="form-control"
                            placeholder="Leave Description"
                            disabled={
                              window.sessionStorage.getItem("user_level_id") !==
                              "2"
                            }
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-4 col-sm-8">
                          <button type="submit" className="btn btn-default">
                            Submit
                          </button>
                          &nbsp;&nbsp;
                          {isUser && (
                            <button
                              type="reset"
                              onClick={reset}
                              className="btn btn-danger"
                            >
                              Reset
                            </button>
                          )}
                          &nbsp;&nbsp;
                          <Link to="/leave-report">
                            <button type="submit" className="btn btn-default">
                              Back
                            </button>
                          </Link>
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

LeaveAdd.propTypes = {
  setAlert: PropTypes.func.isRequired,
  leave: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(LeaveAdd);
