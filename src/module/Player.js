import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import '../style/Weapon.css';


class Player extends Component {
    constructor(props) {
        super(props);

        this.state = { player: [] };
    }

    handleClick = () => {
        this.props.history.push('/players/');
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAccount/" + this.props.match.params.id,
            responseType: "json"
        }).then(response => {
            this.setState({ player: response.data });
        })
    }

    render() {

        return (
            <div className="playerDeets">
                <Table dark bordered hover striped size="m" id="playerDetails" className="gunDetails">
                    <thead><tr onClick={this.handleClick}>
                        <th></th>
                    </tr></thead>
                    <tbody>
                        <tr><td>Name</td><td>{this.state.player.username}</td></tr>
                        <tr><td>Email</td><td>{this.state.player.email}</td></tr>
                        <tr><td>Password</td><td>{this.state.player.password}</td></tr>

                    </tbody>

                </Table>
            </div>
        );
    }
}
export default Player;