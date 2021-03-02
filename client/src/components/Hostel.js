import React, { Fragment, useState, useEffect } from 'react';
// import FlashMessage from "react-flash-message";
import Search from '../search/Search';

const Hostel = () => {

    return (
        <Fragment>

            <div className="hostelContainer">

                <div className="bodyContainer">

                    <div className="filterContainer">
                        <div className="filterContainerHeader">Filters</div>
                        <hr />

                        <Search />

                    </div>

                    <div className="pgContainer">

                        {/* {
                            hostels.length > 0 && (

                                hostels.map(hos => (
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
                        } */}

                    </div>

                </div>
            </div>

        </Fragment>


    )
}

export default Hostel;