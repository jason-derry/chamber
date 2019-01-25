import React, { Component } from 'react';
import Login from './Login';
import Navigation from './Navigation';
import Register from './Register';
import Weapon from './Weapon';
import WeaponList from './WeaponList';
import PlayerList from './PlayerList';
import { BrowserRouter as Router, Route } from "react-router-dom";

class Routing extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoggedIn: false };
  }

  componentDidMount() {
    console.log(this.state.isLoggedIn);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Navigation} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/weapons" component={WeaponList}  />
          <Route exact path="/weapons/:id" component={Weapon} />
          <Route exact path="/players" component={PlayerList} />
        </div>
      </Router >
    );
  }
}

export default Routing;
