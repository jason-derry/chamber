import React, { Component } from 'react';
import Login from './Login';
import Navigation from './Navigation';
import WeaponList from './WeaponList';
import Register from './Register';
import { BrowserRouter as Router, Route } from "react-router-dom";

class Routing extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route exact path="/" component={Navigation} />
          <Route path="/weapons" component={WeaponList} />
        </div>
      </Router >
    );
  }
}

export default Routing;
