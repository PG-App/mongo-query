import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import FlashMessage from "react-flash-message";
import kota from '../kota.jpg';

import { fetchCities } from '../auth/apiForAuth';

const Landing = () => {
    const [query, setQuery] = useState('');

    const [values, setValues] = useState({
        hostels: [

        ],
        city: '',
        success: false,
        error: ''
    });

    const { hostels, city, success, error } = values;

    const handleChange = event => {
        setQuery(event.target.value);
    }

    const loadCities = () => {
        fetchCities(query).then(data => {
            console.log(data);
            if (data.error) {
                setValues({
                    ...values,
                    error: 'Oops! No PGs found for your searched city!'
                });
            } else {
                setValues({
                    ...values,
                    city: data.hostels[0].cityName,
                    hostels: data.cities,
                    success: true
                });
            }
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        loadCities()
    }

    const intro = () => (
        <section className="introSection">
            <div className="introSectionTop">
                <div className="linesAndSearch">
                    <p id="intro_line">End your PG finding problems with NEST</p>
                    <p id="intro_line_next">Type in a location and find best PGs for you</p>
                    <form onSubmit={handleSubmit}>
                        <div className="introSearch">
                            <input
                                type="text"
                                id="input_location"
                                name="cityName"
                                value={query}
                                placeholder="Search by city, locality..."
                                onChange={e => handleChange(e)}
                            />
                            <button id="btn_search">Search</button>
                        </div>
                    </form>
                </div>
                {/* <image src="Home SVG/Group R 1.svg" id="intro_right_svg" /> */}
            </div>
            {/* <img src="Home SVG/wave B.svg" id="intro_bottom_svg" /> */}
            <img src={kota} id="intro_right_svg" />
            <hr />
        </section>

    )

    return (
        <Fragment>

            {
                error && (
                    <Fragment>
                        <FlashMessage duration={5000} persistOnHover={true}>
                            <div class="showAndSearch">
                                <div class="showingLine">
                                    {error}
                                </div>
                            </div>
                        </FlashMessage>
                    </Fragment>
                )
            }

            {
                intro()
            }

            {/* {showError()} */}

            {
                hostels.length > 0 && (
                    <Redirect
                        to={{
                            pathname: '/hostels',
                            state: { values }
                        }}
                    />
                )
            }

        </Fragment>
    )
}

export default Landing;