import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { authenticate } from './authApi';
import { Redirect } from 'react-router-dom';

function OtpVerify(props) {
	// axios.defaults.withCredentials = true;

	const [error, setError] = useState({
		error: '',
		success: ''
	});
	const [redirect, setRedirect] = useState(false);
	const { value, handleChange } = props;
	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	const { phone, code, username } = value;

	console.log(phone, code, username);

	const confirmOtp = () => {
		axios
			.post('http://localhost:5000/api/verifyOTP', {
				phone: `${value.phone}`,
				code: `${value.code}`,
				username: `${value.username}`,
				// withCredentials: true
			})
			.then(function (res) {
				console.log(res);

				authenticate(res.data.user, () => {
					console.log(res.data.user);
					setRedirect(true);
					setError({ ...error, success: res.data.user });
				});

				// window.location.reload();
			})
			.catch(function (error) {
				console.log(error.response);
				setError({ ...error, error: error.response.data.msg });
			});
	};
	return (
		<Fragment>

			{redirect && (
				<Redirect to='/' />
			)}

			<div>

				<input
					type="text"
					value={value.username}
					onChange={handleChange('username')}
					placeholder="Enter username"
				/>

				<input
					type="tel"
					value={value.phone}
					onChange={handleChange('phone')}
					placeholder="Enter phone"
				/>

				<input
					type="text"
					value={value.code}
					onChange={handleChange('code')}
					placeholder="Enter the 6 digits OTP"
				/>
			</div>
			<button onClick={back}>
				Back
					</button>
			<button onClick={confirmOtp}>
				Confirm OTP
			</button>
		</Fragment>

	);
}

export default OtpVerify;
