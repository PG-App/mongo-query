import React, { Fragment, useState } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { signup } from './apiForAuth';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, error, success } = values;


    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    }

    const signupForm = () => (
        <Fragment>
            <div className="signUpContainer">
                <div className="header">NEST</div>
                <div className="signUpLine">Sign up for your account</div>
                <form className="signUpForm" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        className="inputEmail"
                        placeholder="Enter username"
                        value={name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        className="inputEmail"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="inputPassword"
                        placeholder="Enter password"
                        value={password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btnSignUp">Sign Up</button>
                </form>
                <p className="loginLink"><a href="#">Already have an account? Log in</a></p>
                <hr />
                <span id="or">or</span>
                <hr />
                <div className="googleSignUp">
                    <a href="#" class="google btn"><i class="fa fa-google fa-fw">
                    </i> Login with Google+
    </a>
                </div>
            </div>
        </Fragment>
    )

    const lottie = () => (
        <Fragment>
            <div className="lottie">
                <Player src="https://assets3.lottiefiles.com/packages/lf20_ymbzgxgc.json" background="#E10F35"
                    speed="1.3" style={{ height: '300px', width: '300px' }} loop autoplay></Player>
            </div>
        </Fragment>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Your account has been sent for verification. Please check your email to verify it!
        </div>
    );

    return (
        <Fragment>
            <div className="bodyContainer">

                {lottie()}

                {showError()}
                
                {showSuccess()}

                {signupForm()}

            </div>
        </Fragment>
    )
}

export default Signup;