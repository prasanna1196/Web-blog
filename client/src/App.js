import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Home from "./components/Home";
import Dashboard from "./components/posts/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlerstState";
import PostState from "./context/post/Poststate";

const App = () => {
  // useEffect(() => {
  //   axios.get("/api/posts");
  //   console.log("lets see");
  // }, []);

  return (
    <AuthState>
      <PostState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </PostState>
    </AuthState>
  );
};

export default App;
