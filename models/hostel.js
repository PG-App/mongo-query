const mongoose = require('mongoose');

const HostelSchema = mongoose.Schema({
    // city: [{
    cityName: { type: String, required: true },
    hostel: [{
        hostelName: { type: String, required: true },
        type: { type: String },
        street: { type: String },
        locality: { type: String },
        pincode: { type: Number, required: true },
        seater: [{
            seaterType: { type: Number, required: true },
            price: { type: Number, required: true }
        }]
    }]
    // }]
});

module.exports = mongoose.model('Hostel', HostelSchema);