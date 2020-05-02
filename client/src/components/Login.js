import React, { useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route

	const [credentials, setCredentials] = useState({});

	const handleInputChange = (e) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const login = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post('http://localhost:5000/api/login', credentials)
			.then((res) => {
				console.log(credentials);
				localStorage.setItem('token', res.data.payload);
				console.log(localStorage.getItem('token'));
				props.history.push('/colors');
			})
			.catch((err) => console.log(err));
	};

	return (
		<section>
			<div>
				<h1>Welcome to the Bubble App!</h1>
			</div>
			<div>
				<form onSubmit={login}>
					<input
						type="text"
						name="username"
						value={credentials.username}
						onChange={handleInputChange}
						placeholder="Username"
					/>
					<input
						type="password"
						name="password"
						value={credentials.password}
						onChange={handleInputChange}
						placeholder="Password"
					/>
					<button>Log In</button>
				</form>
			</div>
		</section>
	);
};

export default Login;
