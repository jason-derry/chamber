import React, { Component } from 'react';
import Login from './Login';
import Navigation from './Navigation';
import Register from './Register';
import WeaponList from './WeaponList';
import PlayerList from './PlayerList';
import { BrowserRouter as Router, Route } from "react-router-dom";

class Routing extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Navigation} />
          <Route path="/register" component={Register} />
          <Route path="/weapons" component={WeaponList} />
          <Route path="/players" component={PlayerList} />
          </div>
      </Router>
    );
  }
}

export default Routing;
