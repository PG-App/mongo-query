const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const CitySchema = mongoose.Schema({
    cityName: { type: String, required: true },
    hostel: [
        {
            type: ObjectId,
            ref: 'hostel'
        }
    ]
});

module.exports = mongoose.model('city', CitySchema);