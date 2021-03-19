import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import RouterNavLink from './RouterNavLink';

export default function Header() {
	return (
		<Navbar className="p-4" bg="transparent" expand="lg">
			<LinkContainer to="/">
				<Navbar.Brand>BSS ERC-20 Template</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<RouterNavLink exact to="/">
						Home
					</RouterNavLink>
					<RouterNavLink to="/account">Account</RouterNavLink>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item href="#">Action 1</NavDropdown.Item>
						<NavDropdown.Item href="#">Action 2</NavDropdown.Item>
						<NavDropdown.Item href="#">Action 3</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#">Separated Action</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
