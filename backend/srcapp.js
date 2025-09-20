const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

app.use(helmet());

// CORS
const allowed = ['https://localhost:5173', 'https://localhost:5174'];
const corsOptions = {
  origin: allowed,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight

app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');

app.use('/api/auth', authRoutes);

app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}!`, timestamp: new Date() });
});

app.get('/health', (req, res) => res.json({ ok: true }));

module.exports = app;
