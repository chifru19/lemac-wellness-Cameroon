require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Booking = require('./models/Booking'); // Links to the model we just made

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// 1. Database Connection
// Uses the URI from .env, or defaults to local MongoDB for development
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/spa_wellness';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 2. API: Create a New Booking
app.post('/api/book', async (req, res) => {
    try {
        const { name, phone, service, amount } = req.body;
        
        const newBooking = new Booking({
            name,
            phone,
            service,
            amount
        });

        await newBooking.save();

        // Placeholder for WhatsApp API Logic
        console.log(`📱 WhatsApp notification queued for: ${phone}`);
        
        res.status(201).json({ message: 'Booking saved to database!' });
    } catch (error) {
        console.error('Save Error:', error);
        res.status(400).json({ error: error.message });
    }
});

// 3. API: Fetch All Bookings (For the Admin Dashboard)
app.get('/api/admin/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ date: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// 4. Serve the Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Spa Server running at http://localhost:${PORT}`);
});