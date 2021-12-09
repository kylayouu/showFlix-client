import React from "react";
import { Form, Button } from 'react-bootstrap';

function UpdateUser({editUsername, editPassword, editEmail, editBirthdate, handleUpdate}) {
	const user = localStorage.getItem('user');
	return (
		<Form onSubmit={(e) => handleUpdate(e)}>
			<Form.Label>Username</Form.Label>
			<Form.Control type='text' name='Username' defaultValue={user.Username} onChange={e => editUsername(e)}/>
			<Form.Label>Password</Form.Label>
			<Form.Control type='password' name='Password' defaultValue={user.Password} onChange={e => editPassword(e)}/>
			<Form.Label>Email</Form.Label>
			<Form.Control type='email' name='email' defaultValue={user.Email} onChange={e => editEmail(e)}/>
			<Form.Label>Birthdate</Form.Label>
			<Form.Control type='date' name='birthdate' defaultValue={user.Birthdate} onChange={e => editBirthdate(e)}/>
			<Button variant='primary' type='submit'>Update</Button>
		</Form>
	)
}

export default UpdateUser