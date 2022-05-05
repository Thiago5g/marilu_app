import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import LoginLayout from "layouts/Login/Login.js"
import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/becare-manager.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/login" render={props => <LoginLayout {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin" />
      {/* <Redirect from="/login" to="/admin/dashboard" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
