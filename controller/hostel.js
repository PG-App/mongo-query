const Hostel = require('../models/hostel');
const City = require('../models/city');

exports.create_hostel_get = (req, res) => {
    res.render('add-hostel');
}

exports.get_all_hostels = async (req, res) => {
    await Hostel.find().exec((err, hostels) => {
        // console.log(hostels);
        res.json(hostels);
    });
}

exports.create_hostel_post = (req, res) => {
    const {
        cityName,
        hostelName,
        pincode,
        type,
        bed,
        ac,
        price
    } = req.body;

    const newHostel = new Hostel({
        cityName,
        hostel: [{
            hostelName,
            type,
            pincode,
            bed,
            ac
        }]
    });

    newHostel.save();
    res.send('Saved!');
}

exports.get_hostel_by_id = async (req, res) => {
    const id = req.params.id;
    await Hostel.findById(id).exec((err, hostel) => {
        res.json(hostel);
    });
}

exports.update_hostel_post = async (req, res) => {
    try {
        const id = req.params.id;
        const { cityName, feature_image, bed } = req.body;
        const options = {
            upsert: true,
            new: true
        };

        const updatedHostel = await Hostel.findByIdAndUpdate(
            id,
            {
                $set: {
                    cityName,
                    'hostel.0.feature_image': feature_image,
                    'hostel.0.bed': bed
                }
            },
            options
        );
        res.json({ hostels: updatedHostel });

    } catch (err) {
        console.log(err);
    }
}

exports.search_hostel_get = async (req, res) => {
    const { cityName, type, bed, ac, budget_min, budget_max } = req.query;
    // console.log(req.query);

    const cityDetails = await City.find({ cityName });
    // console.log(cityDetails[0].cityName);

    // res.send('ok');
    await Hostel.find(
        {
            cityName: cityDetails[0]._id,
            type: type,
            bed: bed,
            ac: ac
        },
        (err, hostels) => {
            // console.log(hostels);
            // res.send(hostels);
            res.render('results', {
                hostels,
                cities: cityDetails
            });
        });
}

exports.search_hostel_post = (req, res) => {
    const { cityName } = req.body;

    const city = { $regex: req.body.cityName, $options: 'i' };
    const hostels = {};

    const data = City.find({
        'cityName': city
    }, (err, cities) => {
        res.render('results', {
            cities,
            hostels
        });
    });
}

exports.add_city = async (req, res) => {
    const { cityName } = req.body;

    const newCity = new City({
        cityName
    });

    await newCity.save();
    res.send('City created successfully');
}

exports.add_hostel = async (req, res) => {
    const cityID = req.params.cityID;
    const { hostelName, type, bed, ac, price, pincode } = req.body;

    const cityDetails = await City.findById(cityID);
    // console.log(cityDetails);
    // res.send('ok');

    const newHostel = await new Hostel({
        cityName: cityID,
        hostelName,
        type,
        pincode,
        bed,
        ac,
        price,
        pincode
    }).save();

    // console.log(newHostel);

    if (newHostel) {
        cityDetails.hostel.push(newHostel);
    }

    await cityDetails.save();

    res.send('Hostel created successfully');
}