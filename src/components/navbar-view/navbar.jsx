import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";


class NavbarView extends React.Component {

	constructor() {
		super();
		this.state = {
		}
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null
		});
	}

	render() {
		const { user } = this.props;
		if (!user) return <div className='main-view' />;
		return (
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href='/'>showFlix</Navbar.Brand>
					<Nav>
						<Nav.Link href='/'>Movies</Nav.Link>
						<Nav.Link href={`/users/${user}`}>My Account</Nav.Link>
						<Nav.Link href='/' onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		)
	}
}

export default NavbarView;