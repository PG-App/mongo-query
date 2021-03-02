import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CitySearch = () => {
    const [query, setQuery] = useState('');

    const handleChange = e => {
        setQuery(e.target.value);
    };

    // console.log(query);

    const handleCitySearch = () => {
        if (query.length === 0) {
            return '/search?';
        }
        return `/search?cityName=${query}`
    }

    return (
        <Fragment>
            <div className="introSearch">
                <input
                    type="text"
                    id="input_location"
                    name="cityName"
                    value={query}
                    placeholder="Search by city, locality..."
                    onChange={e => handleChange(e)}
                />
                <Link to={handleCitySearch} id="btn_search">Search</Link>
            </div>
        </Fragment>
    )
}

export default CitySearch;