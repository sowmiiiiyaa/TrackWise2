const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const topicRoutes = require('./routes/topicRoutes');
const habitRoutes = require('./routes/habitRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/habits', habitRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'DevTrack Backend is running' });
});

module.exports = app;
