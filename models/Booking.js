const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required for WhatsApp notifications'],
        trim: true
    },
    service: {
        type: String,
        required: true,
        enum: ['Massage (25,000 XAF)', 'Pedicure (10,000 XAF)', 'Wellness Scrub (15,000 XAF)']
    },
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);