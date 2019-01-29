import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../style/Weapon.css';


class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player: [],
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
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
                <div className="userCP">
                <Button className="userCPbutton" href={"/usercp/" + this.props.match.params.id}>userCP</Button>
                </div>
                <div className="delAcc">
                <Button className="delAccButton" color="danger" onClick={this.toggle}>Delete Account</Button>
                </div>
                <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                    <ModalBody toggle={this.toggle}>Are you sure you want to delete {this.state.player.username}?</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleDelete}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default Player;