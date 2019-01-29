import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Logo from './Logo';
import '../style/Login.css';
import axios from 'axios';
const bcrypt = require('bcryptjs');

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        };
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleInput = () => {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAllAccounts",
            responseType: "json"
        }).then(response => {
            let accounts = response.data;
            for (let account = 0; account < accounts.length; account++) {
                if (((this.state.username === accounts[account].username) || (this.state.username === accounts[account].email)) &&
                    (bcrypt.compareSync(this.state.password, accounts[account].password))) {
                    this.props.history.push("/");
                }
            }
        });
    }


    render() {
        return (
            <div>
                <div className="logLogo"><Logo /></div>
                <div className="login">
                    <Form>
                        <FormGroup inline>
                            <Label for="username" hidden>username</Label>
                            <Input type="username" name="username" id="username" placeholder="username/email" value={this.state.username} onChange={this.handleUsernameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </FormGroup>
                        <Button className="loginButton" onClick={this.handleInput}>Login</Button>
                        <br />
                        <a href="/register">Create Account</a>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;