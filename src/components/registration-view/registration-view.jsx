import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RegistrationView(props) {
	const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, username, password);
    props.onRegistration(username);
  };

  return (
    <form>
			<label>
        Email:
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

RegistrationView.PropTypes = {
	registration: PropTypes.shape({
		Email: PropTypes.string.isRequired,
		Username: PropTypes.string.isRequired,
		Password: PropTypes.string.isRequired,
	}).isRequired,
};

export default RegistrationView