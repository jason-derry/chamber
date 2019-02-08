import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalBody, ModalFooter, Input } from 'reactstrap';
import '../style/Raid.css';


class PlayerRaid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player: [],
            weapon: [],
            oppPlayer: [],
            oppWeapon: [],
            currentWep: ""
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleBack = () => {
        this.props.history.push('/players/');
    }

    handleClick = () => {
        this.props.history.push('/players/weapons/' + this.props.match.params.id);
    }

    weaponSelect = (event) => {
        for (var i = 0; i < this.state.weapon.length; i++) {
            if (this.state.weapon[i].name === event.target.value) {
                this.setState({ currentWep: this.state.weapon[i] });
            }
        }
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAccount/" + JSON.parse(sessionStorage.getItem("user")).id,
            responseType: "json"
        }).then(response => {
            this.setState({ 
                player: response.data,
                weapon: response.data.weapons,
                currentWep: response.data.weapons[0]
            });
        })
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAccount/" + this.props.match.params.id,
            responseType: "json"
        }).then(response => {
            this.setState({ 
                oppPlayer: response.data,
                oppWeapon: response.data.weapons 
            });
        })
    }

    render() {            
        const weapons = this.state.weapon.map((item) => (
            <option>{item.name}</option>
        ));
        return (
            <div className="playerRaid">
                <h1 className="playerName">{this.state.player.username} ⚔ {this.state.oppPlayer.username}</h1>
                <div className="gunDetails1">
                    <Input type="select" className="gunSelect1" onChange={this.weaponSelect}>
                        {weapons}
                    </Input>
                    <Table dark bordered hover striped size="sm" id="smGunDetails" className="smGunDetails">
                        <tbody>
                            <tr><td>Type</td><td>{this.state.currentWep.type}</td></tr>
                            <tr><td>Ammo</td><td>{this.state.currentWep.ammo}</td></tr>
                            <tr><td>Weight</td><td>{this.state.currentWep.weight}kg</td></tr>
                            <tr><td>Mag Size</td><td>{this.state.currentWep.magSize}</td></tr>
                            <tr><td>Reload Time</td><td>{this.state.currentWep.reloadSpd}s</td></tr>
                            <tr><td>Rate of Fire</td><td>{this.state.currentWep.rof}rds/min</td></tr>
                            <tr><td>Effective Range</td><td>{this.state.currentWep.range}m</td></tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
export default PlayerRaid;