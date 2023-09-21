import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/Dashboard" />;
  }
  return (
    <section className="container-container">
      <section id="inner-headline">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="pageTitle">About Employee Management System</h2>
            </div>
          </div>
        </div>
      </section>
      <section id="content">
        <div className="container">
          <div className="about">
            <section className="features">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div>
                      <h2>About Employee Management System</h2>
                      <p>
                        Employee Management that uses coaching to motivate and
                        build trust with workers can unlock enormous human
                        potential. Yet, communication tactics alone may fall
                        short in the face of multi-generational workforces,
                        rising numbers of freelance workers and complex
                        regulations. Technology, whether it’s workforce
                        Management software or a human capital Management
                        solution, can often help business leaders maintain
                        productivity more effectively in rapidly changing
                        environments.
                      </p>
                      <p>
                        Employee Management is the process by which employers
                        ensure workers perform their jobs to the best of their
                        abilities so as to achieve business goals. It typically
                        entails building and maintaining healthy relationships
                        with employees, as well as monitoring their daily labor
                        and measuring progress. In this way, employers can
                        identify opportunities for improvement and recognize
                        achievements.
                      </p>
                    </div>
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="features-item">
                      <div className="features">
                        <div className="icon">
                          <i>
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              viewBox="0 0 36 36"
                            >
                              <g
                                id="clarityEmployeeGroupSolid0"
                                fill="currentColor"
                              >
                                <ellipse
                                  cx="18"
                                  cy="11.28"
                                  rx="4.76"
                                  ry="4.7"
                                />
                                <path d="M10.78 11.75h.48v-.43a6.7 6.7 0 0 1 3.75-6a4.62 4.62 0 1 0-4.21 6.46Zm13.98-.47v.43h.48A4.58 4.58 0 1 0 21 5.29a6.7 6.7 0 0 1 3.76 5.99Zm-2.47 5.17a21.45 21.45 0 0 1 5.71 2a2.71 2.71 0 0 1 .68.53H34v-3.42a.72.72 0 0 0-.38-.64a18 18 0 0 0-8.4-2.05h-.66a6.66 6.66 0 0 1-2.27 3.58ZM6.53 20.92A2.76 2.76 0 0 1 8 18.47a21.45 21.45 0 0 1 5.71-2a6.66 6.66 0 0 1-2.27-3.55h-.66a18 18 0 0 0-8.4 2.05a.72.72 0 0 0-.38.64V22h4.53Zm14.93 5.77h5.96v1.4h-5.96z" />
                                <path d="M32.81 21.26h-6.87v-1a1 1 0 0 0-2 0v1H22v-2.83a20.17 20.17 0 0 0-4-.43a19.27 19.27 0 0 0-9.06 2.22a.76.76 0 0 0-.41.68v5.61h7.11v6.09a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.26a1 1 0 0 0-1-1Zm-1 10.36H17.64v-8.36h6.3v.91a1 1 0 0 0 2 0v-.91h5.87Z" />
                              </g>
                            </svg>
                          </i>
                        </div>
                        <div className="features-content">
                          <h3>Employee Management system</h3>
                          <p>
                            Employee Management that uses coaching to motivate
                            and build trust with workers can unlock enormous
                            human potential.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="features">
                        <div className="icon">
                          {/* <i className="icon-envelope-open icons"></i> */}
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M6.25 2A2.25 2.25 0 0 0 4 4.25v15.5A2.25 2.25 0 0 0 6.25 22h7.5A2.25 2.25 0 0 0 16 19.771v-1.52a.75.75 0 0 0-.75-.75c-.453 0-.739-.123-.936-.282c-.208-.167-.38-.425-.511-.789c-.273-.755-.302-1.75-.302-2.68a.75.75 0 0 0-.202-.512l-.165-.177a2.449 2.449 0 0 0-.17-.173c-.074-.07-.3-.285-1.183-1.168c-.469-.469-.728-.865-.813-1.168a.616.616 0 0 1-.016-.325a.713.713 0 0 1 .205-.323a.71.71 0 0 1 .322-.204a.612.612 0 0 1 .324.016c.302.085.698.346 1.167.815c.54.54 1.053 1.046 1.512 1.5c.76.752 1.373 1.36 1.72 1.73a.75.75 0 0 0 1.097-1.023A55.424 55.424 0 0 0 16 11.424V8.06l2.841 2.842c.422.422.66.994.66 1.59v8.758a.75.75 0 0 0 1.5 0v-8.757a3.75 3.75 0 0 0-1.099-2.652L16 5.939v-1.69A2.25 2.25 0 0 0 13.75 2h-7.5Zm6.142 14.94c.097.268.222.534.384.782A2.25 2.25 0 0 0 11.5 19.75v.75h-3v-.75a2.25 2.25 0 0 0-2.25-2.25H5.5v-11h.75A2.25 2.25 0 0 0 8.5 4.25V3.5h3v.75a2.25 2.25 0 0 0 2.25 2.25h.75v3.438l-.469-.468c-.531-.531-1.148-1.008-1.821-1.198a2.106 2.106 0 0 0-1.104-.025a2.056 2.056 0 0 0-.632.285a3.5 3.5 0 1 0 1.55 6.324c.037.684.13 1.427.368 2.084ZM8 12a2 2 0 0 1 1.456-1.925a2.16 2.16 0 0 0 .068.883c.189.673.665 1.291 1.197 1.823l.665.662A2 2 0 0 1 8 12ZM5.5 4.25a.75.75 0 0 1 .75-.75H7v.75a.75.75 0 0 1-.75.75H5.5v-.75ZM13 3.5h.75a.75.75 0 0 1 .75.75V5h-.75a.75.75 0 0 1-.75-.75V3.5ZM14.5 19v.75a.75.75 0 0 1-.75.75H13v-.75a.75.75 0 0 1 .75-.75h.75ZM7 20.5h-.75a.75.75 0 0 1-.75-.75V19h.75a.75.75 0 0 1 .75.75v.75Z"
                              />
                            </svg>
                          </i>
                        </div>
                        <div className="features-content">
                          <h3>Salary Management System</h3>
                          <p>
                            Employee Management that uses coaching to motivate
                            and build trust with workers can unlock enormous
                            human potential.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="features">
                        <div className="icon">
                          <i className="icon-login icons"></i>
                        </div>
                        <div className="features-content">
                          <h3>Leave Management System</h3>
                          <p>
                            Employee Management that uses coaching to motivate
                            and build trust with workers can unlock enormous
                            human potential.{" "}
                          </p>
                        </div>
                      </div>
                      <div className="features">
                        <div className="icon">
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              viewBox="0 0 2048 2048"
                            >
                              <path
                                fill="currentColor"
                                d="M958 1328q101 40 184 106t142 153t91 187t33 210v64h-128v-64q0-119-45-224t-124-183t-183-123t-224-46q-119 0-224 45t-183 124t-123 183t-46 224v64H0v-64q0-109 32-210t92-187t142-152t184-107q-45-31-81-72t-61-88t-38-100t-14-108q0-93 35-174t96-142t142-96t175-36q93 0 174 35t142 96t96 142t36 175q0 55-13 107t-39 100t-61 89t-81 72zm-254-48q66 0 124-25t101-68t69-102t26-125q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124q0 66 25 124t68 102t102 69t125 25zM2048 0v1024h-256l-384 384v-384h-128V896h256v203l203-203h181V128H640v230q-32 4-64 10t-64 18V0h1536z"
                              />
                            </svg>
                          </i>
                        </div>
                        <div className="features-content">
                          <h3>Feedback Logging System</h3>
                          <p>
                            Employee Management that uses coaching to motivate
                            and build trust with workers can unlock enormous
                            human potential.{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <img
                      className="img-responsive"
                      src="img/home.jpeg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
