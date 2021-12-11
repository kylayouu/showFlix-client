import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


function NavbarView({user}) {
	onLoggedOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null
		});
	}
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href='/'>showFlix</Navbar.Brand>
				<Nav>
					<Nav.Link href='/'>Movies</Nav.Link>
					<Nav.Link href={`/users/${user}`}>My Account</Nav.Link>
					<Nav.Link onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
				</Nav>
			</Container>
  	</Navbar>
	)
}

export default NavbarView;