import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Navigation from './Navigation';
import './WeaponList.css';


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
            url: "http://localhost:8081/chamber-api/api/chamber/weapons" + this.props.location.search,
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
            </tr>
        ));

        return (
            <div id="layout-content" className="layout-content-wrapper">
                {/* <Navigation /> */}
                <Table dark bordered hover striped size="m">
                    <thead><tr onClick={this.handleBack}>
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