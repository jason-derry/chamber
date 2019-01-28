import React, { Component } from 'react';
import Login from './Login';
import Navigation from './Navigation';
import Register from './Register';
import Weapon from './Weapon';
import Player from './Player';
import WeaponList from './WeaponList';
import PlayerList from './PlayerList';
import AmendAccount from './AmendAccount';
import { BrowserRouter as Router, Route } from "react-router-dom";

class Routing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      id: -1
    };

    this.handleID = this.handleID.bind(this)
  }

  handleID() {
    this.setState({ id: this.props.uid })
  }

  componentDidMount() {
    console.log(this.state.isLoggedIn);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/login" render={(props) => <Login component={Login} {...props} id={this.state.id} handleID={this.handleID} />} />
          <Route exact path="/" component={Navigation} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/weapons" component={WeaponList} />
          <Route exact path="/weapons/:id" component={Weapon} />
          <Route exact path="/players" component={PlayerList} />
          <Route exact path="/players/:id" component={Player} />
          <Route exact path="/usercp" render={() => <AmendAccount component={AmendAccount} id={this.state.id} />} />
        </div>
      </Router>
    );
  }
}

export default Routing;
