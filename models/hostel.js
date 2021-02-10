const mongoose = require('mongoose');

const HostelSchema = mongoose.Schema({
    cityName: { type: String, required: true },
    hostel: [{
        hostelName: { type: String, required: true },
        feature_image: { type: String },
        type: { type: String, default: 'Boys' },
        street: { type: String },
        locality: { type: String },
        pincode: { type: Number, required: true },
        bed: { type: String, required: true },
        ac: { type: String, default: 'Non-AC' },
        budget_min: { type: Number },
        budget_max: { type: Number },
    }]
});

module.exports = mongoose.model('Hostel', HostelSchema);