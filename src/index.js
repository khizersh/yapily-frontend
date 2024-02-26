import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import "./assets/css/argon-design-system-react.scss?v1.1.0";
import "./assets/css/common.css";
import Tracker from "./pages/Tracker";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import UserList from "./pages/dashboard/UserList";
import CustomCalender from "./pages/dashboard/CustomCalender";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Token from "./pages/Token";
// import "./assets/css/"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="242626251664-pg5lmetaaaqreh3pddstjs3q1239nqnp.apps.googleusercontent.com">
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route
            path="/tracker"
            exact
            render={(props) => <Tracker {...props} />}
          />
          <Route
            path="/token"
            exact
            render={(props) => <Token {...props} />}
          />
          <Route
            path="/signup"
            exact
            render={(props) => <Signup {...props} />}
          />
          <Route
            path="/signin"
            exact
            render={(props) => <Signin {...props} />}
          />
          <Route
            path="/dashboard/admin/user"
            exact
            render={(props) => <UserList {...props} />}
          />
          <Route
            path="/dashboard/admin/my-calender"
            exact
            render={(props) => <CustomCalender {...props} />}
          />
        </Layout>
      </Switch>
    </BrowserRouter>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
