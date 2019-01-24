import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import Navigation from './Navigation';
import './WeaponList.css';


class WeaponList extends Component {
    constructor(props) {
        super(props);

        this.state = { weapon: [] };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://localhost:8080/chamber-api/api/chamber/weapons" + this.props.location.search,
            responseType: "json"
        }).then(response => {
            this.setState({ weapon: response.data });
        })
    }

 

    render() {
        const weapons = this.state.weapon.map((item, i) => (
            <tr>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.ammo}</td>
            </tr>
        ));

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
                        {weapons}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default WeaponList;