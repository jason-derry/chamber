import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Logo from './Logo';
import '../style/Navigation.css';

class SmolNav extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {
        return (
            <div className="smolNav">
                <a href="/login">
                <img className="signout" src="/logout.jpg" alt="sign out"/>
                </a>
                {/* <div className="navLogo" style={{height: '20px'}}><Logo /></div> */}

                <Navbar dark color="dark" light expand="md" style={{width: '60vw', maxWidth: '900px'}}>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>Weapons</DropdownToggle>
                                <DropdownMenu left>
                                    <DropdownItem href="/weapons">All Weapons</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem href="/weapons?type=Assault">Assault</DropdownItem>
                                    <DropdownItem href="/weapons?type=Handgun">Handgun</DropdownItem>
                                    <DropdownItem href="/weapons?type=LMG">LMG</DropdownItem>
                                    <DropdownItem href="/weapons?type=Rifle">Rifle</DropdownItem>
                                    <DropdownItem href="/weapons?type=Shotgun">Shotgun</DropdownItem>
                                    <DropdownItem href="/weapons?type=SMG">SMG</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>Attachments</DropdownToggle>
                                <DropdownMenu left>
                                    <DropdownItem>All Attachments</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Muzzle</DropdownItem>
                                    <DropdownItem>Barrel</DropdownItem>
                                    <DropdownItem>Sight</DropdownItem>
                                    <DropdownItem>Magazine</DropdownItem>
                                    <DropdownItem>Grip</DropdownItem>
                                    <DropdownItem>Stock</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/players/">Player List</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default SmolNav;
