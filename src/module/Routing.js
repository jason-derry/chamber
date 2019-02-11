import React, { Component } from 'react';
import Login from './Login';
import Navigation from './Navigation';
import Register from './Register';
import Weapon from './Weapon';
import Player from './Player';
import WeaponList from './WeaponList';
import PlayerList from './PlayerList';
import PlayerWeaponList from './PlayerWeaponList';
import Amend from './Amend';
import SmolNav from './SmolNav';
import { PrivateRoute } from './PrivateRoute.jsx';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Routing extends Component {

  componentDidMount() {
    console.log(window.location.pathname);
    if (window.location.pathname === "/") {
      this.forceUpdate();
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          {window.location.pathname === "/" ? (
            <PrivateRoute exact path="/" component={Navigation} />
          ) : (
            <PrivateRoute path="/" component={SmolNav} />
          )}

          <PrivateRoute exact path="/weapons" component={WeaponList} />
          <PrivateRoute path="/weapons/:id" component={Weapon} />
          <PrivateRoute exact path="/players" component={PlayerList} />
          <PrivateRoute exact path="/players/:id" component={Player} />
          <PrivateRoute path="/usercp" component={Amend} />
          <PrivateRoute path="/players/weapons/:id" component={PlayerWeaponList} />
        </div>
      </Router>
    );
  }
}

export default Routing;
