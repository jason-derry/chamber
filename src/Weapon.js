import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './Weapon.css';


class Weapon extends Component {
    constructor(props) {
        super(props);

        this.state = { weapon: [] };
    }

    handleClick = () => {
        this.props.history.push('/weapons/');
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/weapons/" + this.props.match.params.id,
            responseType: "json"
        }).then(response => {
            this.setState({ weapon: response.data });
        })
    }

    render() {

        return (
            <div className="gunDeets">
                {/* <Navigation /> */}
                <img className="gunImage" src={"/gun_images/" + this.state.weapon.name + ".png"} alt="gun" onerror="this.src='/gun_images/placeholder.png'" />
                <Table dark bordered hover striped size="m" id="gunDetails" className="gunDetails">
                    <thead><tr onClick={this.handleClick}>
                        <th></th>
                    </tr></thead>
                    <tbody>
                        <tr><td>Name</td><td>{this.state.weapon.name}</td></tr>
                        <tr><td>Type</td><td>{this.state.weapon.type}</td></tr>
                        <tr><td>Ammo</td><td>{this.state.weapon.ammo}</td></tr>
                        <tr><td>Weight</td><td>{this.state.weapon.weight}kg</td></tr>
                        <tr><td>Mag Size</td><td>{this.state.weapon.magSize}</td></tr>
                        <tr><td>Reload Time</td><td>{this.state.weapon.reloadSpd}s</td></tr>
                        <tr><td>Rate of Fire</td><td>{this.state.weapon.rof}rds/min</td></tr>
                        <tr><td>Effective Range</td><td>{this.state.weapon.range}m</td></tr>
                    </tbody>

                </Table>
            </div>
        );
    }
}
export default Weapon;