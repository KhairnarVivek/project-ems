import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link } from "react-router-dom";
import config from "../../utils/config";
import {  useParams } from "react-router-dom";

const HopitalDetails = () => {
  // Function for edit //
  let { id } = useParams();

  const [feedbackDetails, setData] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`${config.api_url}/feedback/${id}`).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    }
  }, [id]);

  // const isUser = window.sessionStorage.getItem("user_level_id") == 2;

  return (
    <section className="container-container">
      <section id="inner-headline">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="pageTitle">Feedback Details</h2>
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
                      <h2 className="h2c">Customer Feedback Details</h2>
                    </div>
                    <br />
                  </div>
                </div>
                <section className="vh-100">
                  <table
                    class="table table-striped table-bordered"
                    style={{ width: "50%" }}
                  >
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">Column</th>
                        <th scope="col">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th class="thead-dark">Name</th>
                        <td>{feedbackDetails.feedback_name}</td>
                      </tr>
                      <tr>
                        <th class="thead-dark">Email</th>
                        <td>{feedbackDetails.feedback_email}</td>
                      </tr>
                      <tr>
                        <th class="thead-dark">Rating</th>
                        <td>{feedbackDetails.feedback_rating} Star</td>
                      </tr>
                      <tr>
                        <th class="thead-dark">Feedback</th>
                        <td>{feedbackDetails.feedback_message}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="form-group">
                    <div className="col-sm-offset-4 col-sm-8">
                      &nbsp;&nbsp;
                      <Link to="/feedback-report">
                        <button type="submit" className="btn btn-default">
                          Back
                        </button>
                      </Link>
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

export default HopitalDetails;
