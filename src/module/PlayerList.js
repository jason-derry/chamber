import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import '../style/WeaponList.css';


class PlayerList extends Component {
    constructor(props) {
        super(props);

        this.state = { player: [] };
    }

    handleBack = () => {
        this.props.history.push('/');
    }

    handleClick = (item) => {
        this.props.history.push('/players/' + item.id);
    }

    handleRaid = (item) => {
        this.props.history.push('/raid/' + item.id);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAllAccounts",
            responseType: "json"
        }).then(response => {
            this.setState({ player: response.data });
        })
    }

 

    render() {
        const players = this.state.player.map((item, i) => (
            <tr>
                <td onClick={this.handleClick.bind(this, item)}>{item.username}</td>
                <td onClick={this.handleClick.bind(this, item)}>${item.cash}</td>
                <td><Button className="smBuyButton" onClick={this.handleRaid.bind(this, item)}>⚔</Button></td>
            </tr>
        ));

        return (
            <div id="layout-content" className="layout-content-wrapper">
                {/* <Navigation /> */}
                <Table dark bordered hover striped size="m">
                    <thead><tr onClick={this.handleBack}>
                        <th>Name</th>
                        <th>Cash</th>
                        <th style={{width: '1%', textAlign: "center"}}>Raid</th>
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