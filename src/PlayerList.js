import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import './WeaponList.css';


class PlayerList extends Component {
    constructor(props) {
        super(props);

        this.state = { player: [] };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://localhost:8081/chamber-api/api/chamber/getAllAccounts",
            responseType: "json"
        }).then(response => {
            this.setState({ player: response.data });
        })
    }

 

    render() {
        const players = this.state.player.map((item, i) => (
            <tr>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
            </tr>
        ));

        return (
            <div id="layout-content" className="layout-content-wrapper">
                {/* <Navigation /> */}
                <Table dark bordered hover striped size="m">
                    <thead><tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>password</th>
                    </tr></thead>
                    <tbody>
                        {players}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default PlayerList;