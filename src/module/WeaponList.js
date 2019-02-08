import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../style/WeaponList.css';


class WeaponList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            weapon: [],
            cash: null
        };

        this.toggle = this.toggle.bind(this);
    }

    handleBack = () => {
        this.props.history.push('/');
    }

    handleClick = (item) => {
        this.props.history.push('/weapons/' + item.id);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleBuy = (id, price) => {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAccount/" + JSON.parse(sessionStorage.getItem("user")).id,
            responseType: "json"
        }).then(response => {
            this.setState({ cash: response.data.cash });
            if (this.state.cash >= price) {
                axios({
                    method: "post",
                    url: "http://3.8.14.10:8081/chamber-api/api/chamber/addWepToAcc/" + JSON.parse(sessionStorage.getItem("user")).id +"/"+ id 
                }).then(() => {
                    axios({
                        method: "put",
                        url: "http://3.8.14.10:8081/chamber-api/api/chamber/amendAccount/" + JSON.parse(sessionStorage.getItem("user")).id,
                        data: {
                            username: JSON.parse(sessionStorage.getItem("user")).username,
                            password: JSON.parse(sessionStorage.getItem("user")).password,
                            email: JSON.parse(sessionStorage.getItem("user")).email,
                            cash: this.state.cash - price
                        }
                    })
                });
            }
        })
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/weapons" + this.props.location.search,
            responseType: "json"
        }).then(response => {
            this.setState({ weapon: response.data });
        })
    }

 

    render() {
        const weapons = this.state.weapon.map((item) => (
            <tr>
                <td onClick={this.handleClick.bind(this, item)}>{item.name}</td>
                <td onClick={this.handleClick.bind(this, item)}>{item.type}</td>
                <td onClick={this.handleClick.bind(this, item)}>${item.price}</td>
                <td><Button className="smBuyButton" onClick={this.handleBuy.bind(this, item.id, item.price)}>+</Button></td>
                {/* <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                    <ModalBody toggle={this.toggle}>Are you sure you want to buy {item.name}?</ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.handleBuy.bind(this, item.id, item.price)}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>No</Button>
                    </ModalFooter>
                </Modal> */}
            </tr>
        ));

        return (
            <div id="layout-content" className="layout-content-wrapper">
                <Table dark bordered hover striped size="m">
                    <thead><tr onClick={this.handleBack}>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Cost</th>
                        <th style={{width: '1%', textAlign: "center"}}>Buy</th>
                    </tr></thead>
                    <tbody>
                        {weapons}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default WeaponList;