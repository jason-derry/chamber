import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Logo from './Logo';
import '../style/Register.css';
import axios from 'axios';
const bcrypt = require('bcryptjs');

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            passwordConf: "",
            email: ""
        };
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    handlePasswordChangeConf = (event) => {
        this.setState({ passwordConf: event.target.value });
    }

    handleInput = () => {
        if (this.state.username && this.state.email && this.state.password) {
            if (this.state.password === this.state.passwordConf) {
                var hash = bcrypt.hashSync(this.state.password, 10);
                axios({
                    method: "post",
                    url: "http://3.8.14.10:8081/chamber-api/api/chamber/createAccount",
                    data: {
                        username: this.state.username,
                        password: hash,
                        email: this.state.email
                    }
                });
                this.props.history.push('/');
            } else {
                console.log("passwords don't match");
            }   
        } else {
            console.log("fill out all fields");
        }
    }

    render() {
        return (
            <div>
                <div className="logLogo"><Logo /></div>
                <div className="register">
                    <Form>
                        <FormGroup inline>
                            <Label for="username" hidden>username</Label>
                            <Input type="username" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" hidden>email</Label>
                            <Input type="email" name="email" id="email" placeholder="email" value={this.state.email} onChange={this.handleEmailChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="passwordConf" hidden>password</Label>
                            <Input type="password" name="passwordConf" id="passwordConf" placeholder="confirm password" onChange={this.handlePasswordChangeConf} required />
                        </FormGroup>
                        <Button className="createAccButton" onClick={this.handleInput}>Create account</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register;