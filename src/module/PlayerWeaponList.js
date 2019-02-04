import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import '../style/WeaponList.css';


class PlayerWeaponList extends Component {
    constructor(props) {
        super(props);

        this.state = { player: [] };
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
            this.setState({ player: response.data.weapons });
            console.log(this.state.player);
        })
    }

    render() {
        const players = this.state.player.map((item) => (
            <tr>
                <td>{item.name}</td>
            </tr>
        ));

        return (
            <div id="layout-content" className="layout-content-wrapper">
                <Table dark bordered hover striped size="m">
                    <thead><tr onClick={this.handleBack}>
                        <th>Name</th>
                    </tr></thead>
                    <tbody>
                        {players}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default PlayerWeaponList;