import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Logo from './Logo';
import './Login.css';
import { BrowserRouter as Link } from "react-router-dom";

class Login extends Component {
    render() {
        return (
            <div>
                <div className="logLogo"><Logo /></div>
                <div className="login">
                    <Form>
                        <FormGroup inline>
                            <Label for="username" hidden>username</Label>
                            <Input type="username" name="username" id="username" placeholder="username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" />
                        </FormGroup>
                        <Link to="/">
                        <Button className="loginButton">Login</Button>
                        </Link><br/>
                        <a href="/register">Create Account</a>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;