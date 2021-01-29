const Hostel = require('../models/hostel');

exports.create_hostel_get = (req, res) => {
    res.render('add-hostel');
}

exports.create_hostel_post = (req, res) => {
    const {
        cityName,
        hostelName,
        pincode,
        type,
        seaterType,
        price
    } = req.body;

    console.log(req.body);

    const newHostel = new Hostel({
        cityName,
        hostel: [{
            hostelName,
            type,
            pincode,
            seater: [{
                seaterType,
                price
            }]
        }]
    });

    newHostel.save();
    res.send('Saved!');
}

exports.search_hostel_get = (req, res) => {
    res.render('search-hostel');
}

exports.search_hostel_post = (req, res) => {
    // console.log(req.query.city);
    // res.render('hostel');
    // const data = await Hostel.find({
    //     $or:
    //         [{ 'hostel': { "$elemMatch": { 'hostelName': 'Bhargab PG' } } }]
    // });

    const {
        cityName,
        hostelType,
        seaterType,
        price,
    } = req.body;

    // console.log(hostelType);

    const data = Hostel.find({
        'cityName': cityName,
        'hostel.type': hostelType,
        'hostel.seater.seaterType': seaterType,
        'hostel.seater.price': price
    }, (err, hostels) => {
        res.render('hostels', {
            hostels
        });
    }).limit(10);
}