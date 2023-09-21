import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { PropTypes } from "prop-types";
import axios from "axios";
import config from "../../utils/config";

const FeedbackAdd = ({ setAlert, feedback, isAuthenticated }) => {
  const navigate = useNavigate();
  // Function for edit //
  let { id } = useParams();

  // Creating FormData Form elements ////
  const [message, setMessage] = useState({
    show_message: false,
    error_type: "",
    msg: "",
  });

  // Creating FormData Form elements ////
  const [formData, setFormData] = useState({
    feedback_id: "",
    feedback_name: "",
    feedback_email: "",
    feedback_rating: "",
    feedback_message: "",
  });

  const reset = () => {
    setFormData({
      feedback_id: "",
      feedback_name: "",
      feedback_email: "",
      feedback_rating: "",
      feedback_message: "",
    });
  };

  useEffect(() => {
    if (id) {
      axios.get(`${config.api_url}/feedback/${id}`).then((res) => {
        console.log(res.data);
        setFormData(res.data);
      });
    }
  }, [id]);

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
        url: `${config.api_url}/feedback/${id}`,
        data: formData,
      })
        .then(function (response) {
          //handle success
          console.log("Success  : ");
          console.log(response);
          navigate("/feedback");
          setMessage({
            show_message: true,
            error_type: "alert-success",
            msg: "Your feedback registered successfully. We will connect you soon !!!",
          });
        })
        .catch(function (response) {
          //handle error
          console.log("Error  : ");
          console.log(response);
        });
    } else {
      axios({
        method: "post",
        url: `${config.api_url}/feedback`,
        data: formData,
      })
        .then(function (response) {
          //handle success
          console.log("Success  : ");
          console.log(response);
          navigate("/feedback");
          setMessage({
            show_message: true,
            error_type: "alert-success",
            msg: "Your feedback registered successfully. We will connect you soon !!!",
          });
          setFormData({
            feedback_id: "",
            feedback_name: "",
            feedback_email: "",
            feedback_rating: "",
            feedback_message: "",
          });
        })
        .catch(function (response) {
          //handle error
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
              <h2 className="pageTitle">Feedback Form</h2>
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
                      <h2 className="h2c">Write Your Feedback</h2>
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
                <div className="row">
                  <section className="vh-100 col">
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <form className="form-horizontal" onSubmit={onSubmit}>
                        <div className="form-group">
                          <label
                            className="control-label col-sm-4"
                            htmlFor="email"
                          >
                            Full Name:
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              value={formData.feedback_name}
                              onChange={(e) => onChange(e)}
                              name="feedback_name"
                              className="form-control"
                              placeholder="Full Name"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            className="control-label col-sm-4"
                            htmlFor="email"
                          >
                            Email ID:
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="email"
                              value={formData.feedback_email}
                              onChange={(e) => onChange(e)}
                              name="feedback_email"
                              className="form-control"
                              placeholder="Enter Your Email ID"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            className="control-label col-sm-4"
                            htmlFor="email"
                          >
                            Select Rating:
                          </label>
                          <div className="col-sm-8">
                            <select
                              name="feedback_rating"
                              value={formData.feedback_rating}
                              className="form-control"
                              required
                              onChange={(e) => onChange(e)}
                            >
                              <option>Select Your Rating</option>
                              {Array.from({ length: 5 }, (value, key) => (
                                <option value={key + 1}>{key + 1} Star</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            className="control-label col-sm-4"
                            htmlFor="email"
                          >
                            Write Your Feedback:
                          </label>
                          <div className="col-sm-8">
                            <textarea
                              value={formData.feedback_message}
                              onChange={(e) => onChange(e)}
                              name="feedback_message"
                              className="form-control"
                              placeholder="Write your feedback"
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
                            <button
                              type="reset"
                              onClick={reset}
                              className="btn btn-danger"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </section>
                  <section className="float-end col text-center">
                    <iframe
                      title="googleMaps"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3810.562425998801!2d78.47268107470748!3d17.240004107035173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba57e67a2bc25%3A0xc0d5031672bc95cd!2sCentre%20for%20Development%20of%20Advanced%20Computing!5e0!3m2!1sen!2sin!4v1693456631227!5m2!1sen!2sin"
                      width="400"
                      height="300"
                      style={{ border: "0" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
};

FeedbackAdd.propTypes = {
  setAlert: PropTypes.func.isRequired,
  feedback: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(FeedbackAdd);
