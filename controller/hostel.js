const Hostel = require('../models/hostel');
const City = require('../models/city');

const ObjectId = require('mongodb').ObjectID;

exports.create_hostel_get = (req, res) => {
    res.render('add-hostel');
}

exports.get_all_hostels = async (req, res) => {
    const hostels = await Hostel.find().populate('cityName');
    // console.log(hostels);
    res.json({ hostels });
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

exports.getAllHostelsByCity = async (req, res) => {
    const hostels = await Hostel.find()
        .populate('cityName').select('_id hostelName cityName');
    res.json({ hostels });
}

exports.search_hostel_post = async (req, res) => {
    const { cityName } = req.body;

    const city = { $regex: req.body.cityName, $options: 'i' };

    const cities = await City.find({ 'cityName': city }).populate('hostel');

    res.render('results', {
        message: `Fetched ${cities[0].hostel.length} hostels`,
        msg: '',
        cities,
        hostels: cities[0].hostel
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

exports.searchHostelByCity = async (req, res) => {
    try {
        const { cityName } = req.query;

        const city = { $regex: cityName, $options: 'i' };

        const hostels = await City.find({ 'cityName': city })
            .populate('hostel')
            .select('cityName hostel');

        // const h = await hostels[0].hostel;
        // const oids = [];


        // h.forEach(function (item) {
        //     oids.push(new ObjectId(item));
        // });

        // const hostelsByCity = await Hostel.find({ _id: { $in: oids } });

        res.json({ hostels });
    } catch (error) {
        return res.json({ error });
    }
}

exports.getHostelById = async (req, res) => {
    const { id } = req.params;
    const hostel = await Hostel.findById(id);
    //    const data = hostel.json();
    return res.json(hostel);
}


exports.applyFilter = async (req, res) => {
    const { cityName } = req.body;

    const type = req.body.type ? req.body.type : '';
    const bed = req.body.bed ? req.body.bed : '';
    const ac = req.body.ac ? req.body.ac : '';

    let filter = {};

    if(type) filter.type = type;
    if(bed) filter.bed = bed;
    if(ac) filter.ac = ac;

    const regexCity = { $regex: cityName, $options: 'i' };
    const cityDetails = await City.find({ cityName: regexCity });

    filter.cityName = cityDetails[0]._id;

    const hostels = await Hostel.find(filter);

    console.log(cityDetails[0].cityName);

    res.json({
        city: cityDetails[0].cityName,
        size: hostels.length,
        // cities: cityDetails,
        hostels: hostels
    });
}