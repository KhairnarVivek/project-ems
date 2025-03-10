import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import config from "../../utils/config";
import { useParams } from "react-router-dom";

const HopitalDetails = () => {
  // Function for edit //
  let { id } = useParams();

  const [leaveDetails, setData] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`${config.api_url}/leave/${id}`).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    }
  }, []);

  return (
    <section className="container-container">
      <section id="inner-headline">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="pageTitle">
                Details of {leaveDetails.leave_name}
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
                      <h2 className="h2c">Leave Details</h2>
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
                        <td>{leaveDetails.leave_name}</td>
                      </tr>
                      <tr>
                        <th class="thead-dark">Description</th>
                        <td>{leaveDetails.leave_description}</td>
                      </tr>
                    </tbody>
                  </table>
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
