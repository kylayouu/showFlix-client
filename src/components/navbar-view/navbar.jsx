import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";


function NavbarView() {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="#home">showFlix</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="#home">Movies</Nav.Link>
					<Nav.Link href="#profile">My Account</Nav.Link>
					<Nav.Link href="#logout">Logout</Nav.Link>
				</Nav>
			</Container>
  	</Navbar>
	)
}

export default NavbarView;