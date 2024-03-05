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
import { GoogleOAuthProvider } from "@react-oauth/google";
import Token from "./pages/Token";
import Success from "./pages/Success";
// import "./assets/css/"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="242626251664-pg5lmetaaaqreh3pddstjs3q1239nqnp.apps.googleusercontent.com">
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route
            path="/get-detail"
            exact
            render={(props) => <Token {...props} />}
          />
          <Route
            path="/success"
            exact
            render={(props) => <Success {...props} />}
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
