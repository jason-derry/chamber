import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import '../style/Amend.css'
const bcrypt = require('bcryptjs');
class Amend extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            oldPassword: "",
            password: "",
            passwordConf: "",
            email: ""
        };
    }

    handleidChange = (event) => {
        this.setState({ id: event.target.value });
    }
    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
    handleOldPasswordChange = (event) => {
        this.setState({ oldPassword: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    handlePasswordChangeConf = (event) => {
        this.setState({ passwordConf: event.target.value });
    }

    handleBack = () => {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAccount/" + JSON.parse(sessionStorage.getItem("user")).id,
            responseType: "json"
        }).then(response => {
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(response.data));
        })
        this.props.history.push('/players/' + JSON.parse(sessionStorage.getItem("user")).id)
    }

    handleNewUsername = () => {
        axios({
            method: "put",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/amendAccount/" + JSON.parse(sessionStorage.getItem("user")).id,
            data: {
                username: this.state.username,
                password: JSON.parse(sessionStorage.getItem("user")).password,
                email: JSON.parse(sessionStorage.getItem("user")).email
            }
        }).then(() => {
            this.handleBack();
        });
    }

    handleNewEmail = () => {
        axios({
            method: "put",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/amendAccount/" + JSON.parse(sessionStorage.getItem("user")).id,
            data: {
                username: JSON.parse(sessionStorage.getItem("user")).username,
                password: JSON.parse(sessionStorage.getItem("user")).password,
                email: this.state.email
            }
        }).then(() => {
            this.handleBack();
        });
    }

    handleNewPassword = () => {
        if (this.state.password === this.state.passwordConf && (bcrypt.compareSync(this.state.oldPassword, this.state.account.password))) {
            var hash = bcrypt.hashSync(this.state.password, 10);
            axios({
                method: "put",
                url: "http://3.8.14.10:8081/chamber-api/api/chamber/amendAccount/" + JSON.parse(sessionStorage.getItem("user")).id,
                data: {
                    username: JSON.parse(sessionStorage.getItem("user")).username,
                    password: hash,
                    email: JSON.parse(sessionStorage.getItem("user")).email
                }
            }).then(() => {
                this.handleBack();
            });
        } else {
            console.log("passwords don't match")
        }
    }

    render() {
        return (
            <div>
                <img src="https://cdn1.iconfinder.com/data/icons/arrows-4/512/arrow_5-512.png" className="backButton" alt="back" onClick={() => this.handleBack()}/>
                <div className="usercp">
                    <Form>
                        <FormGroup>
                            <Label for="username" hidden>username</Label>
                            <Input type="username" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} required />
                            <Button className="changeUsernameButton" onClick={this.handleNewUsername}>Change username</Button>
                        </FormGroup>
                    </Form>
                    <Form>
                        <FormGroup>
                            <Label for="email" hidden>email</Label>
                            <Input type="email" name="email" id="email" placeholder="email" value={this.state.email} onChange={this.handleEmailChange} required />
                            <Button className="changeEmailButton" onClick={this.handleNewEmail}>Change email</Button>
                        </FormGroup>
                    </Form>
                    <Form>
                        <FormGroup>
                            <Label for="oldPassword" hidden>password</Label>
                            <Input type="password" name="password" id="password" placeholder="current password" onChange={this.handleOldPasswordChange} required />

                            <Label for="newPassword" hidden>password</Label>
                            <Input type="password" name="password" id="password" placeholder="new password" value={this.state.password} onChange={this.handlePasswordChange} required />

                            <Label for="passwordConf" hidden>password</Label>
                            <Input type="password" name="passwordConf" id="passwordConf" placeholder="confirm password" onChange={this.handlePasswordChangeConf} required />
                            <Button className="changePasswordButton" onClick={this.handleNewPassword}>Change password</Button>
                        </FormGroup>
                    </Form >
                </div>
            </div>
        );
    }
}

export default Amend;
