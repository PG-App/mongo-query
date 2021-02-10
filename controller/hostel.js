const Hostel = require('../models/hostel');

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
    const { type, bed, ac, budget_min, budget_max } = req.query;
    // console.log(req.query);

    const data = await Hostel.find(
        {
            'hostel.type': type,
            'hostel.bed': bed,
            'hostel.ac': ac
        },
        (err, hostels) => {
            res.render('results', {
                hostels
            });
        }).limit(10);
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
        res.render('results', {
            hostels
        });
    }).limit(10);
}