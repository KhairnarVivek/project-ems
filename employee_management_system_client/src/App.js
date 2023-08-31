import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/Layout/Alert";
import Header from "./components/Layout/Header";

import "./App.css";
import Contact from "./components/Pages/Contact";
import About from "./components/Pages/About";
import Landing from "./components/Pages/Landing";
import OwnerLanding from "./components/Layout/OwnerLanding";
import Login from "./components/auth/login";
import Adminlogin from "./components/auth/Adminlogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loaduser } from "./actions/auth";
import setauthtoken from "./utils/setauthtoken";
import Footer from "./components/Layout/Footer";
import Dashboard from "./components/auth/Dashboard";
import UserReport from "./components/User/UserReport";
import UserLogin from "./components/User/UserLogin";
import UserAdd from "./components/User/UserAdd";
import UserDetails from "./components/User/UserDetails";
import LeaveReport from "./components/Leave/LeaveReport";
import LeaveAdd from "./components/Leave/LeaveAdd";
import LeaveDetails from "./components/Leave/LeaveDetails";
import FeedbackReport from "./components/Feedback/FeedbackReport";
import FeedbackAdd from "./components/Feedback/FeedbackAdd";
import FeedbackDetails from "./components/Feedback/FeedbackDetails";
import SalaryReport from "./components/Salary/SalaryReport";
import SalaryAdd from "./components/Salary/SalaryAdd";
import SalaryDetails from "./components/Salary/SalaryDetails";
import Team from "./components/Pages/Team";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

if (localStorage.token) {
  setauthtoken(localStorage.token);
}

const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE_RIGHT,
  timeout: 5000,
  // offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const App = () => {
  useEffect(() => {
    store.dispatch(loaduser());
  }, []);
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          <Fragment>
            <Header />
            <Alert />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/Adminlogin" element={<Adminlogin />} />
              <Route path="/About" element={<About />} />
              <Route path="/Team" element={<Team />} />

              <Route path="/leave-add" element={<LeaveAdd />} />
              <Route path="/leave-report" element={<LeaveReport />} />
              <Route path="/leave-add/:id" element={<LeaveAdd />} />
              <Route path="/leave-details/:id" element={<LeaveDetails />} />

              <Route path="/salary-add" element={<SalaryAdd />} />
              <Route path="/salary-report" element={<SalaryReport />} />
              <Route path="/salary-add/:id" element={<SalaryAdd />} />
              <Route path="/salary-details/:id" element={<SalaryDetails />} />

              <Route path="/register" element={<UserAdd />} />
              <Route path="/user-report" element={<UserReport />} />
              <Route path="/user-add/:id" element={<UserAdd />} />
              <Route path="/UserLogin" element={<UserLogin />} />
              <Route path="/user-details/:id" element={<UserDetails />} />

              <Route path="/feedback-report" element={<FeedbackReport />} />
              <Route path="/feedback" element={<FeedbackAdd />} />
              <Route
                path="/feedback-details/:id"
                element={<FeedbackDetails />}
              />

              <Route path="/Login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
};
export default App;
