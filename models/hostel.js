const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const HostelSchema = mongoose.Schema({
    cityName: { type: ObjectId, ref: 'city' },
    hostelName: { type: String, required: true },
    feature_image: { type: String, default: 'https://via.placeholder.com/300' },
    type: { type: String, default: 'Boys' },
    street: { type: String },
    locality: { type: String },
    pincode: { type: Number, required: true },
    bed: { type: String, required: true },
    ac: { type: String, default: 'Non-AC' },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('hostel', HostelSchema);