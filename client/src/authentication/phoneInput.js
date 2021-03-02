import React, { Fragment } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
function PhoneInput(props) {
	const { value, handleChange } = props;

	const Continue = (e) => {
		axios
			.post('http://localhost:5000/api/signin', {
				phone: `${value.phone}`
			})
			.then(function (res) {
				console.log(res);
			});

		e.preventDefault();
		props.nextStep();
	};
	return (
		<Fragment>
			<div class="bodyContainer">

				<div className="lottie">
					<Player src="https://assets3.lottiefiles.com/packages/lf20_ymbzgxgc.json" background="#E10F35"
						speed="1.3" style={{ height: '300px', width: '300px' }} loop autoplay></Player>
				</div>

				<div className="signUpContainer">
					<div className="header">NEST</div>
					<div className="signUpLine">Sign up for your account</div>
					<form className="signUpForm">

						<input
							type="text"
							value={value.username}
							onChange={handleChange('username')}
							className="inputUsername"
							required="required"
							placeholder="Enter username" />

						<input
							type="tel"
							value={value.phone}
							onChange={handleChange('phone')}
							className="inputPhoneNumber"
							required="required"
							placeholder="Enter phone number" />

						<button onClick={Continue} className="btnSignUp">
							Sign Up
						</button>
					</form>
					
					<p class="loginLink"><Link to="/signin">Already have an account? Log in</Link></p>
				</div>

			</div>
		</Fragment>

	);
}

export default PhoneInput;