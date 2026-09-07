require('dotenv').config({ quiet: true });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const seatRoutes = require('./routes/seatRoutes');
const theaterRoutes = require('./routes/theaterRoutes');
const showTimeRoutes = require('./routes/showTimeRoutes');
const offerRoutes = require('./routes/offerRoutes');
const theaterDashboardRoutes = require('./routes/theaterDashboardRoutes');

const app = express();

// --- Core middleware ---
app.use(cors({ origin: process.env.CLINET_URL || process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/showtimes', showTimeRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/theaters', theaterDashboardRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// --- 404 handler ---
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// --- Centralized error handler ---
// Understands both AppError-style (statusCode) and the domain-specific
// exception classes (Seat/Review/Payment errors) that also carry statusCode.
app.use((err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        message,
        errorCode: err.errorCode,
        details: err.details,
        unavailableSeats: err.unavailableSeats
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();

module.exports = app;
