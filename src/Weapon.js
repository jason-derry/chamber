import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './WeaponList.css';


class Weapon extends Component {
    constructor(props) {
        super(props);

        this.state = { weapon: [] };
    }

    componentDidMount() {
        var id = window.location.pathname.split("/").slice(-1)[0];
        console.log(id);
        axios({
            method: "get",
            url: "http://localhost:8081/chamber-api/api/chamber/weapons/" + id,
            responseType: "json"
        }).then(response => {
            this.setState({ weapon: response.data });
        })
    }



    render() {

        return (
            <div id="layout-content" className="layout-content-wrapper">
                {/* <Navigation /> */}
                <Table dark bordered hover striped size="m">
                    <thead><tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Ammo</th>
                    </tr></thead>
                    <tbody>
                        <td>{this.state.weapon.name}</td>
                        <td>{this.state.weapon.type}</td>
                        <td>{this.state.weapon.ammo}</td>
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Weapon;