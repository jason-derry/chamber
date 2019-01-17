import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Logo from './Logo';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <div>
                <div className="loginLogo"><Logo /></div>
                <div className="login">
                    <Form>
                        <FormGroup inline>
                            <Label for="email" hidden>username</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" />
                        </FormGroup>
                        <Button>Login</Button>
                        <a href="/">Create Account</a>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;