import React, { Component } from 'react';
import Login from './Login';
import Navigation from './Navigation';
import Register from './Register';
import Weapon from './Weapon';
import Player from './Player';
import WeaponList from './WeaponList';
import PlayerList from './PlayerList';
import Amend from './Amend';
import { PrivateRoute } from './PrivateRoute.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";

class Routing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    console.log(this.state.isLoggedIn);
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Navigation} />
          <PrivateRoute exact path="/weapons" component={WeaponList} />
          <PrivateRoute path="/weapons/:id" component={Weapon} />
          <PrivateRoute exact path="/players" component={PlayerList} />
          <PrivateRoute path="/players/:id" component={Player} />
          <PrivateRoute path="/usercp" component={Amend} />
        </div>
      </Router>
    );
  }
}

export default Routing;
