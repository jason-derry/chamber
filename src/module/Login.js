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


    handleInput = (e) => {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAllAccounts",
            responseType: "json"
        }).then(response => {
            let accounts = response.data;
            for (let account = 0; account < accounts.length; account++) {
                if (((this.state.username === accounts[account].username) || (this.state.username === accounts[account].email)) &&
                    (bcrypt.compareSync(this.state.password, accounts[account].password))) {
                    sessionStorage.setItem("user", JSON.stringify(accounts[account]));
                    console.log(sessionStorage.getItem("user"));
                    this.props.history.push("/");
                }
            }
        });
        e.preventDefault();
    }


    render() {
        return (
            <div>
                <div className="logLogo"><Logo /></div>
                <div className="login">
                    <Form onSubmit={this.handleInput}>
                        <FormGroup inline>
                            <Label for="username" hidden>username</Label>
                            <Input type="username" name="username" id="username" placeholder="username/email" value={this.state.username} onChange={this.handleUsernameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </FormGroup>
                        <Button type="submit" className="loginButton">Login</Button>
                        <br />
                    </Form>
                    <a href="/register">Create Account</a>
                </div>
            </div>
        );
    }
}

export default Login;