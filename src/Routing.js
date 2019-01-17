import React, { Component } from 'react';
import Login from './Login';
import Navigation from './Navigation';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Routing extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/nav" component={Navigation} />
          </div>
      </Router>
    );
  }
}

export default Routing;
