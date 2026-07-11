require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const { generalLimiter, authLimiter, passwordResetLimiter } = require('./middleware/rateLimiter');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const webhookRoutes = require('./routes/webhookRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const templatesRoutes = require('./routes/templatesRoutes');
const resumeRoutes = require('./routes/resume');
const aiRoutes = require('./routes/ai');

const app = express();
app.set('trust proxy', 1);

/* =======================
   BASIC CONFIG
======================= */
const PORT = process.env.PORT || 8080;

/* =======================
   MIDDLEWARES
======================= */

// Configure session with MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_session_secret_for_dev',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    touchAfter: 24 * 3600 // Time period in seconds to delay touch updates
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true,
    sameSite: 'lax', // Helps protect against CSRF
    maxAge: 10 * 60 * 1000 // 10 minutes
  }
}));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:3001',
    'http://localhost:3000',
    'https://resumecraft-taupe.vercel.app'
  ],
  credentials: true
}));
// Avoid JSON parsing for Stripe webhook to preserve raw body
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/webhook')) {
    return next();
  }
  return express.json()(req, res, next);
});

// Add rate limiting middleware
app.use(generalLimiter);

/* =======================
   MONGODB CONNECTION
======================= */
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

/* =======================
   API ROUTES
======================= */

// Apply auth rate limiting to auth routes
app.use('/api/auth', authLimiter);
// Apply stricter rate limiting to password reset endpoints
app.use('/api/auth/forgot-password', passwordResetLimiter);
app.use('/api/auth/reset-password', passwordResetLimiter);
app.use('/api/auth', authRoutes);
// Stripe webhook: must be mounted before any JSON body parsing
app.use('/webhook', webhookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiRoutes);


/* =======================
   API HEALTH CHECK
======================= */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Resume Builder API is running'
  });
});

/* =======================
   SERVER START
======================= */
// Global handler to prevent crash on unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('⚠️ Unhandled Rejection:', err.message);
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);