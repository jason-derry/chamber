import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import SmolNav from './SmolNav';
import Navigation from './Navigation';
import '../style/WeaponList.css';


class WeaponList extends Component {
    constructor(props) {
        super(props);

        this.state = { weapon: [] };
    }

    handleBack = () => {
        this.props.history.push('/');
    }

    handleClick = (item) => {
        this.props.history.push('/weapons/' + item.id);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/weapons" + this.props.location.search,
            responseType: "json"
        }).then(response => {
            this.setState({ weapon: response.data });
        })
    }

 

    render() {
        const weapons = this.state.weapon.map((item, i) => (
            <tr onClick={this.handleClick.bind(this, item)}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.ammo}</td>
                <td>${item.price}</td>
            </tr>
        ));

        return (
            <div id="layout-content" className="layout-content-wrapper">
                <Table dark bordered hover striped size="m">
                    <thead><tr onClick={this.handleBack}>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Ammo</th>
                        <th>Cost</th>
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