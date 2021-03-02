import React, { Fragment, useState, useEffect } from 'react';
import CitySearch from './CitySearch';

const Landing = () => {
    const [hostels, setHostels] = useState([]);

    const fetchHostels = (type, value) => {
        return fetch(`http://localhost:5000/api/get/hostels`)
            .then(res => {
                return res.json()
            });
    }

    useEffect(() => {
        fetchHostels().then(data => {
            console.log(data);
            setHostels(data.hostels);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <Fragment>
            <section className="introSection">
                <div className="introSectionTop">
                    <div className="linesAndSearch">
                        <p id="intro_line">End your PG finding problems with NEST</p>
                        <p id="intro_line_next">Type in a location and find best PGs for you</p>

                        <CitySearch />

                    </div>
                </div>
            </section>

        </Fragment>
    )
}

export default Landing;