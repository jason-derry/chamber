import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

class AmendAccount extends Component {
    constructor() {
        super();
        this.state = {
            id: 2,
            account: [],
            username: "",
            oldPassword: "",
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
    handleOldPasswordChange = (event) => {
        this.setState({ oldPassword: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    handlePasswordChangeConf = (event) => {
        this.setState({ passwordConf: event.target.value });
    }

    test = () => {
        console.log(this.props.id);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAccount/" + this.state.id,
            responseType: "json"
        }).then(response => {
            this.setState({ account: response.data });
        });
    }

    handleNewUsername = () => {
        axios({
            method: "put",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/amendAccount/" + this.state.id,
            data: {
                username: this.state.username,
                password: this.state.account.password,
                email: this.state.account.email
            }
        });
        window.location.reload();
    }

    handleNewEmail = () => {
        axios({
            method: "put",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/amendAccount/" + this.state.id,
            data: {
                username: this.state.account.username,
                password: this.state.account.password,
                email: this.state.email
            }
        });
        window.location.reload();
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup inline>
                        <Label for="username" hidden>username</Label>
                        <Input type="username" name="username" id="username" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange} required />
                    </FormGroup>
                    <Button className="changeUsernameButton" onClick={this.handleNewUsername}>Change username</Button>
                </Form>
                <Form>
                    <FormGroup>
                        <Label for="email" hidden>email</Label>
                        <Input type="email" name="email" id="email" placeholder="email" value={this.state.email} onChange={this.handleEmailChange} required />
                    </FormGroup>
                    <Button className="changeEmailButton" onClick={this.handleNewEmail}>Change email</Button>
                </Form>
                <Form>
                    <FormGroup>
                        <Label for="oldPassword" hidden>password</Label>
                        <Input type="password" name="password" id="password" placeholder="current password" onChange={this.handleOldPasswordChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="newPassword" hidden>password</Label>
                        <Input type="password" name="password" id="password" placeholder="new password" value={this.state.password} onChange={this.handlePasswordChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="passwordConf" hidden>password</Label>
                        <Input type="password" name="passwordConf" id="passwordConf" placeholder="confirm password" onChange={this.handlePasswordChangeConf} required />
                    </FormGroup>
                    <Button className="changePasswordButton" onClick={this.handleNewPassword}>Change password</Button>
                </Form >
                <Button className="testID" onClick={this.test}>get ID</Button>
            </div >
        );
    }
}

export default AmendAccount;
