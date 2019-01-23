import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Logo from './Logo';
import './Register.css';
import axios from 'axios';
import { BrowserRouter as Link } from "react-router-dom";

class Register extends Component {
    constructor() {
        super();
        this.state = {
          username: "",
          password: "",
          email: "",
        };
      }

      handleUsernameChange = (event) => {
         this.setState({username: event.target.value});
      }
      handleEmailChange = (event) => {
        this.setState({email: event.target.value});
     }
     handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
     }
        
    handleInput = () => {
        axios({
            method: "post",
            url: "http://localhost:8080/chamber-api/api/chamber/createAccount",
            data: {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }
        });
      }

    render() {
        return (
            <div>
                <div className="logLogo"><Logo /></div>
                <div className="register">
                    <Form>
                        <FormGroup inline>
                            <Label for="username" hidden>username</Label>
                            <Input type="username" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" hidden>email</Label>
                            <Input type="email" name="email" id="email" placeholder="email" value={this.state.email} onChange={this.handleEmailChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </FormGroup>
                        <Button className="createAccButton" onClick={this.handleInput}>Create account</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Register;