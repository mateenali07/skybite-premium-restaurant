require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Diagnostic log for deployment
console.log("Backend Initializing... Environment Check:", {
    hasSupabase: !!process.env.SUPABASE_URL,
    hasStripe: !!process.env.STRIPE_SECRET_KEY,
    nodeEnv: process.env.NODE_ENV
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/health', (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

app.use('/api', authRoutes);
app.use('/api', paymentRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Restaurant Chatbot Backend is running');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("GLOBAL SERVER ERROR:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
