import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import '../style/Weapon.css';


class Weapon extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            weapon: [],
            cash: null
        };
    }

    handleClick = () => {
        this.props.history.push('/weapons/');
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/weapons/" + this.props.match.params.id,
            responseType: "json"
        }).then(response => {
            this.setState({ weapon: response.data });
        })
    }

    handleBuyWep = () => {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAccount/" + JSON.parse(sessionStorage.getItem("user")).id,
            responseType: "json"
        }).then(response => {
            this.setState({ cash: response.data.cash });
            if (this.state.cash >= this.state.weapon.price) {
                axios({
                    method: "post",
                    url: "http://3.8.14.10:8081/chamber-api/api/chamber/addWepToAcc/" + JSON.parse(sessionStorage.getItem("user")).id +"/"+ this.props.match.params.id 
                }).then(() => {
                    axios({
                        method: "put",
                        url: "http://3.8.14.10:8081/chamber-api/api/chamber/amendAccount/" + JSON.parse(sessionStorage.getItem("user")).id,
                        data: {
                            username: JSON.parse(sessionStorage.getItem("user")).username,
                            password: JSON.parse(sessionStorage.getItem("user")).password,
                            email: JSON.parse(sessionStorage.getItem("user")).email,
                            cash: this.state.cash - this.state.weapon.price
                        }
                    }).then(() => {
                        this.handleClick();
                    })
                });
            }
        })
    }

    render() {

        return (
            <div className="gunDeets">
                {/* <Navigation /> */}
                <img className="gunImage" src={"/gun_images/" + this.state.weapon.name + ".png"} alt="gun" onError={(e)=>{e.target.onerror = null; e.target.src="/gun_images/placeholder.png"}}/>
                <Table dark bordered hover striped size="m" id="gunDetails" className="gunDetails">
                    <thead><tr onClick={this.handleClick}>
                        <th></th>
                    </tr></thead>
                    <tbody>
                        <tr><td>Name</td><td>{this.state.weapon.name}</td></tr>
                        <tr><td>Type</td><td>{this.state.weapon.type}</td></tr>
                        <tr><td>Ammo</td><td>{this.state.weapon.ammo}</td></tr>
                        <tr><td>Weight</td><td>{this.state.weapon.weight}kg</td></tr>
                        <tr><td>Mag Size</td><td>{this.state.weapon.magSize}</td></tr>
                        <tr><td>Reload Time</td><td>{this.state.weapon.reloadSpd}s</td></tr>
                        <tr><td>Rate of Fire</td><td>{this.state.weapon.rof}rds/min</td></tr>
                        <tr><td>Effective Range</td><td>{this.state.weapon.range}m</td></tr>
                        <tr><td>Price</td><td>${this.state.weapon.price}</td></tr>
                    </tbody>

                </Table>
                <div className="buyButton">
                    <Button onClick={this.handleBuyWep}>buy</Button>
                </div>
            </div>
        );
    }
}
export default Weapon;