import React, { Fragment, useState, useEffect } from 'react';
import FlashMessage from "react-flash-message";

const Hostel = ({ location: { state } }) => {

    const [hostels, setHostels] = useState([state.values.hostels]);
    const [city, setCity] = useState(state.values.city);
    const [message, setMessage] = useState('');
    const success = state.values.success;

    useEffect(() => {
        // if (success) {
        setMessage(`${hostels[0].length} hostels found!`);
        // }
    }, []);

    const genderChange = e => {
        const checked = e.target.checked;
        const checkedValue = e.target.value;
        const checkedName = e.target.name;

        console.log(
            checked,
            checkedValue,
            checkedName
        );
    }

    return (
        <Fragment>

            <div className="hostelContainer">
                {message && (
                    <Fragment>
                        <FlashMessage duration={2000}>
                            <div class="showAndSearch">
                                <div class="showingLine">
                                    {message}
                                </div>
                            </div>
                        </FlashMessage>
                    </Fragment>
                )}

                <div className="bodyContainer">

                    <div className="filterContainer">
                        <div className="filterContainerHeader">Filters</div>
                        <hr />

                        <form className="filterForm">

                            {/* PG GENDER */}

                            <div className="filterCategory">
                                <div className="filterCategoryHeader">Gender</div>
                                <div className="filterCategoryChoice">

                                    <div className="toggleSwitch">
                                        <input
                                            type="checkbox"
                                            id="toggle_switch_type_boys"
                                            name="type"
                                            value="Boys"
                                            onChange={genderChange}
                                        />
                                        <label for="toggle_switch_type_boys"><p className="toggleText">Boys' PG</p></label>
                                    </div>

                                    <div className="toggleSwitch">
                                        <input type="checkbox" id="toggle_switch_type_girls" name="type" value="Girls" />
                                        <label for="toggle_switch_type_girls"><p className="toggleText">Girls' PG</p></label>
                                    </div>

                                </div>
                            </div>


                            {/* PG BED */}

                            <div className="filterCategory">
                                <div className="filterCategoryHeader">Occupancy</div>
                                <div className="filterCategoryChoice">

                                    <div className="toggleSwitch">
                                        <input type="checkbox" id="toggle_switch_single_bed" name="bed" value="Single" />
                                        <label for="toggle_switch_single_bed"><p className="toggleText">Single Bed</p></label>
                                    </div>

                                    <div className="toggleSwitch">
                                        <input type="checkbox" id="toggle_switch_double_bed" name="bed" value="Double" />
                                        <label for="toggle_switch_double_bed"><p className="toggleText">Double Bed</p></label>
                                    </div>

                                    <div className="toggleSwitch">
                                        <input type="checkbox" id="toggle_switch_triple_bed" name="bed" value="Triple" />
                                        <label for="toggle_switch_triple_bed"><p className="toggleText">Triple Bed</p></label>
                                    </div>

                                </div>
                            </div>


                            {/* AC / NON-AC */}

                            <div className="filterCategory">
                                <div className="filterCategoryHeader">AC Type</div>
                                <div className="filterCategoryChoice">

                                    <div className="toggleSwitch">
                                        <input type="checkbox" id="toggle_switch_ac" name="ac" value="AC" />
                                        <label for="toggle_switch_ac"><p className="toggleText">AC</p></label>
                                    </div>

                                    <div className="toggleSwitch">
                                        <input type="checkbox" id="toggle_switch_non_ac" name="ac" value="Non-AC" />
                                        <label for="toggle_switch_non_ac"><p className="toggleText">Non - AC</p></label>
                                    </div>

                                </div>
                            </div>

                            <button type="submit" id="btn_apply_filters">Apply Filters</button>
                        </form>
                    </div>

                    <div className="pgContainer">

                        {
                            hostels[0].length > 0 && (

                                hostels[0].map(hos => (
                                    <div className="pgFlex">
                                        <div className="pgCard">
                                            <img src={hos.feature_image} id="card_pg_image" />
                                            <div className="cardPgDetails">
                                                <p id="card_pg_name">
                                                    {hos.hostelName}
                                                </p>
                                                <p id="card_pg_address">
                                                    {city}
                                                </p>
                                                <p id="card_pg_gender">
                                                    {hos.type}
                                                </p>
                                                <div className="cardBtnGroup">
                                                    <button className="cardBtnclassName" id="card_btn_view">View details</button>
                                                    <button className="cardBtnclassName" id="card_btn_book">Book Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }

                    </div>

                </div>
            </div>

        </Fragment>


    )
}

export default Hostel;