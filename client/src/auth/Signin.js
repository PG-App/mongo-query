import React, { Fragment, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { authenticate, signin, isAuthenticated } from './apiForAuth';
import { Redirect } from 'react-router-dom';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false,
        redirectToReferrer: false
    });

    const { email, password, error, success, redirectToReferrer } = values;

    const { user } = isAuthenticated();

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signin({ email, password }).then(data => {
            if (data.error || data.user === 'Passwords did not match!' || data.user === 'This email is yet to sign up!') {
                setValues({ ...values, error: data.error || data.user, success: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        error: '',
                        success: true,
                        redirectToReferrer: true
                    });
                });
            }
        });
    }

    const lottie = () => (
        <Fragment>
            <div className="lottie">
                <Player src="https://assets3.lottiefiles.com/packages/lf20_ymbzgxgc.json" background="#E10F35"
                    speed="1.3" style={{ height: '300px', width: '300px' }} loop autoplay></Player>
            </div>
        </Fragment>
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    const signinForm = () => (
        <Fragment>
            <div class="signUpContainer">
                <div class="header">NEST</div>
                <div class="signUpLine">Sign in to your account</div>
                <form class="signUpForm" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        class="inputEmail"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter email" />
                    <input
                        type="password"
                        name="password"
                        class="inputPassword"
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter password" />
                    <button type="submit" class="btnSignUp">Sign In</button>
                </form>
                <p class="loginLink"><a href="#">Don't have an account yet? Sign up</a></p>
                <hr />
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
            You are successfully logged in!
        </div>
    );

    return (
        <Fragment>
            <div class="bodyContainer">

                {lottie()}

                {redirectUser()}

                {showError()}

                { showSuccess() }

                {signinForm()}

            </div>
        </Fragment>
    )
}

export default Signin;