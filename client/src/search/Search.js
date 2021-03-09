import React, { Fragment, useState, useEffect } from 'react'
import queryString from 'query-string';

const Search = (props) => {
    const [hostels, setHostels] = useState([]);
    const [cityname, setCityname] = useState('')
    const [type, setType] = useState('');
    const [occupancy, setOccupancy] = useState('');
    const [ac, setAc] = useState('');

    const queriedCity = props.location.search;
    const params = queryString.parse(queriedCity);

    const getHostelsByCityName = () => {
        return fetch(`http://localhost:5000/api/get/cities${queriedCity}`, {
            method: 'GET'
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        })
    }

    const getHostelByType = (type) => {
        const fetchableData = {
            type,
            cityName: params.cityName
        }
        return fetch(`http://localhost:5000/api/hostels/search${queriedCity}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchableData)
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        })
    }

    const getHostelByOccupancy = (occupancy) => {
        const fetchableData = {
            bed: occupancy,
            cityName: params.cityName
        }
        return fetch(`http://localhost:5000/api/hostels/search${queriedCity}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchableData)
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        })
    }

    const getHostelByAC = (ac) => {
        const fetchableData = {
            ac,
            cityName: params.cityName
        }
        return fetch(`http://localhost:5000/api/hostels/search${queriedCity}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchableData)
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getHostelsByCityName().then(data => {
            console.log(data);
            setHostels(data.hostels[0].hostel);
            setCityname(data.hostels[0].cityName);
        });
    }, []);

    useEffect(() => {
        getHostelByType(type).then(data => {
            setHostels(data.hostels);
        });
    }, [type]);

    useEffect(() => {
       getHostelByOccupancy(occupancy).then(data => {
            console.log(data);
            setHostels(data.hostels);
        });
    }, [occupancy]);

    useEffect(() => {
        getHostelByAC(ac).then(data => {
            console.log(data);
            setHostels(data.hostels);
        });
    }, [ac]);

    const handleChangeType = e => {
        setType(e.target.value);
    }

    const handleOccupancy = e => {
        console.log(e.target.value);
        setOccupancy(e.target.value);
    }

    const handleChangeAC = e => {
        console.log(e.target.value);
        setAc(e.target.value);
    }

    return (
        <Fragment>

            <h2>{cityname}</h2>
            <p>
                {JSON.stringify(hostels)}
            </p>

            {/* GENDER */}

            <div class="filterCategory">
                <div class="filterCategoryHeader">Gender</div>
                <div class="filterCategoryChoice">

                    <div class="toggleSwitch">
                        <input
                            onChange={handleChangeType}
                            type="radio" id="toggle_switch_type_boys" name="type" value="Boys" />
                        <label for="toggle_switch_type_boys"><p class="toggleText">Boys' PG</p></label>
                    </div>

                    <div class="toggleSwitch">
                        <input
                            onChange={handleChangeType}
                            type="radio" id="toggle_switch_type_girls" name="type" value="Girls" />
                        <label for="toggle_switch_type_girls"><p class="toggleText">Girls' PG</p></label>
                    </div>

                </div>
            </div>


            {/* BED */}

            <div class="filterCategory">
                <div class="filterCategoryHeader">Occupancy</div>
                <div class="filterCategoryChoice">

                    <div class="toggleSwitch">
                        <input
                            onChange={handleOccupancy}
                            type="radio" id="toggle_switch_single_bed" name="bed" value="Single" />
                        <label for="toggle_switch_single_bed"><p class="toggleText">Single Bed</p></label>
                    </div>

                    <div class="toggleSwitch">
                        <input
                            onChange={handleOccupancy}
                            type="radio" id="toggle_switch_double_bed" name="bed" value="Double" />
                        <label for="toggle_switch_double_bed"><p class="toggleText">Double Bed</p></label>
                    </div>

                    <div class="toggleSwitch">
                        <input
                            onChange={handleOccupancy}
                            type="radio" id="toggle_switch_triple_bed" name="bed" value="Triple" />
                        <label for="toggle_switch_triple_bed"><p class="toggleText">Triple Bed</p></label>
                    </div>

                </div>
            </div>


            {/* AC / NON-AC */}

            <div class="filterCategory">
                <div class="filterCategoryHeader">AC Type</div>
                <div class="filterCategoryChoice">

                    <div class="toggleSwitch">
                        <input
                            onChange={handleChangeAC}
                            type="radio" id="toggle_switch_ac" name="ac" value="AC" />
                        <label for="toggle_switch_ac"><p class="toggleText">AC</p></label>
                    </div>

                    <div class="toggleSwitch">
                        <input
                            onChange={handleChangeAC}
                            type="radio" id="toggle_switch_non_ac" name="ac" value="Non-AC" />
                        <label for="toggle_switch_non_ac"><p class="toggleText">Non - AC</p></label>
                    </div>

                </div>
            </div>

        </Fragment>

    )
}

export default Search;