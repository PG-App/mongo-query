import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/apiForAuth';

const Navbar = ({ history }) => {
    return (
        <div className="navbar">
            <p id="logo">NEST</p>
            <ul>
                <li><Link to="/" id="login_link">Home</Link></li>

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/signin"
                            >
                                Signin
                        </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/signup"
                            >
                                Signup
                        </Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (

                    <Fragment>
                        <li><Link to="/user/dashboard" id="signup_link">Dashboard</Link></li>

                        <li className="nav-item">
                            <span
                                id="login_link"
                                className="nav-link"
                                style={{ cursor: "pointer", color: "#ffffff" }}
                                onClick={() =>
                                    signout(() => {
                                        history.push("/");
                                    })
                                }
                            >
                                <strong>
                                    Signout
                                   </strong>
                            </span>
                        </li>
                    </Fragment>
                )}


                {/* <li><button className="btnDropdown">Select City <sup id="down_arrow_head"></sup></button></li>
                <li><Link to="/signin" id="login_link">Login</Link></li>
                <li><Link to="/signup" id="signup_link">Sign Up</Link></li> */}
            </ul >
        </div >
    )
}

export default withRouter(Navbar);