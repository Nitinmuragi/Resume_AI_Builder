const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const templateRoutes = require('./routes/templateRoutes');
const atsRoutes = require('./routes/atsRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = [
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(u => u.trim().replace(/\/+$/, '')) : []),
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(u => u.trim().replace(/\/+$/, '')) : []),
];

if (process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173');
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. server-to-server, mobile, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (process.env.NODE_ENV === 'development' && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin '${origin}' not allowed by CORS`));
  },
  credentials: true,
}));

// ─── Body Parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Logging ──────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ─── Global Rate Limit ────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', globalLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/ats', atsRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
