const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

/* Parse JSON and CSP violation reports */
app.use(express.json({
  type: (req) => {
    const ct = (req.headers['content-type'] || '').toLowerCase();
    return ct.includes('application/json')
        || ct.includes('application/csp-report')
        || ct.includes('application/reports+json');
  }
}));

/* Helmet baseline headers */
app.use(helmet());

/* Content Security Policy (report-only in dev) */
const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "https://apis.google.com"],
  styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  fontSrc: ["'self'", "https://fonts.gstatic.com"],
  imgSrc: ["'self'", "data:"],
  connectSrc: ["'self'", "https://localhost:5000"], // change to 5001 if your API runs there
  frameAncestors: ["'none'"],
  upgradeInsecureRequests: []
};

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      ...cspDirectives,
      "report-uri": ["/csp-report"]
    },
    reportOnly: process.env.NODE_ENV !== 'production'
  })
);

/* Receive browser CSP violation reports */
app.post('/csp-report', (req, res) => {
  console.log('CSP Violation Report:', JSON.stringify(req.body, null, 2));
  res.sendStatus(204);
});

/* CORS for your React dev server */
const allowed = [
  'https://localhost:5173',
  'https://localhost:5174',
  'https://localhost:5175'
];

const corsOptions = {
  origin: allowed,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

/* Routes */
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');

app.use('/api/auth', authRoutes);

app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}!`, timestamp: new Date() });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

module.exports = app;
