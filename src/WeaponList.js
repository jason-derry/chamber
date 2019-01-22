import React, { Component } from 'react';
import axios from 'axios';

class WeaponList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {weapon: []};
      }
    
      componentDidMount() {
        axios({
            method: "get",
            url: "http://localhost:8081/chamber-api/api/chamber/weapons",
            responseType: "json"
          }).then(response => { this.setState({ weapon: response.data });
        })
      }
    
      render() {
        const weapons = this.state.weapon.map((item, i) => (
          <div>
            <h1>{ item.name.name }</h1>
            <span>{ item.name } { item.type } { item.ammo }</span>
          </div>
        ));
    
        return (
          <div id="layout-content" className="layout-content-wrapper">
            <div className="panel-list">{ weapons }</div>
          </div>
        );
      }
    }
export default WeaponList;