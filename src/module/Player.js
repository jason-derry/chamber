import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../style/Weapon.css';


class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player: [],
            modal: false,
            weapons: [],
            weaponList: ""
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


    componentDidMount() {
        console.log(JSON.parse(sessionStorage.getItem("user")).id);
        console.log(this.props.match.params.id);
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAccount/" + this.props.match.params.id,
            responseType: "json"
        }).then(response => {
            this.setState({ 
                player: response.data,
                weapons: response.data.weapons 
            });
            this.createWeaponList();
            // console.log(this.state.weapons[0].name);
        })
    }

    createWeaponList = () => {
        let wepList = "";
        if (this.state.weapons.length > 0) {
            for(var i = 0; i < this.state.weapons.length; i++) {
                wepList += this.state.weapons[i].name + "\n";
            }
        } else {
            wepList = "None";
        }
        this.setState ({ weaponList: wepList });
    }

    handleDelete = () => {
        axios({
            method: "delete",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/deleteAccount/" + this.props.match.params.id,
            responseType: "json"
        }).then(() => {
            this.props.history.push('/players/');
        });
    }

    render() {
        if (this.state.weaponList === "") {
            return (<div></div>);
        } else {

            return (
                <div className="playerDeets">
                    <Table dark bordered hover striped size="m" id="playerDetails" className="gunDetails">
                        <thead><tr onClick={this.handleBack}>
                            <th></th>
                        </tr></thead>
                        <tbody>
                            <tr><td>Name</td><td>{this.state.player.username}</td></tr>
                            <tr><td>Cash</td><td>${this.state.player.cash}</td></tr>
                            <tr onClick={this.handleClick}><td>Weapons</td><td>{this.state.weaponList}</td></tr>
                        </tbody>
                    </Table>
                    {JSON.parse(sessionStorage.getItem("user")).id === parseInt(this.props.match.params.id) &&
                        JSON.parse(sessionStorage.getItem("user")).password === this.state.player.password &&
                        <div>
                            <div className="userCP">
                                <Button className="userCPbutton" href={"/usercp/"}>userCP</Button>
                            </div>
                            <div className="delAcc">
                                <Button className="delAccButton" color="danger" onClick={this.toggle}>Delete Account</Button>
                            </div>
                            <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                                <ModalBody toggle={this.toggle}>Are you sure you want to delete {JSON.parse(sessionStorage.getItem("user")).username}?</ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={this.handleDelete}>Yes</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>No</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    }
                </div>
            );
        }
    }
}
export default Player;