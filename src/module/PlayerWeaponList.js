import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import '../style/WeaponList.css';


class PlayerWeaponList extends Component {
    constructor(props) {
        super(props);

        this.state = { weapon: [] };
    }

    handleBack = () => {
        this.props.history.push('/players/' + this.props.match.params.id);
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://3.8.14.10:8081/chamber-api/api/chamber/getAccount/" + this.props.match.params.id,
            responseType: "json"
        }).then(response => {
            this.setState({ weapon: response.data.weapons });
        })
    }

    render() {
        const weapons = this.state.weapon.map((item) => (
            <tr>
                <td>{item.name}</td>
                <td>{item.ammo}</td>
            </tr>
        ));

        return (
            <div id="layout-content" className="layout-content-wrapper">
                <Table dark bordered hover striped size="m">
                    <thead><tr onClick={this.handleBack}>
                        <th>Name</th>
                        <th>Ammo</th>
                    </tr></thead>
                    <tbody>
                        {weapons}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default PlayerWeaponList;