import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Logo from './Logo';

class Login extends Component {
    render() {
        return (
            <div>
                <div className="loginLogo"><Logo /></div>
                <div className="login">
                    <Form>
                        <FormGroup inline>
                            <Label for="exampleEmail" hidden>Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword" hidden>Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;