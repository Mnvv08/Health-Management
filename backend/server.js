const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./src/config/db');
const { errorHandler, notFound } = require('./src/middleware/errorHandler');
const { apiLimiter } = require('./src/middleware/rateLimiter');

const hospitalRoutes = require('./src/routes/hospitalRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const authRoutes = require('./src/routes/authRoutes');
const appointmentRoutes = require('./src/routes/appointmentRoutes');

dotenv.config();
connectDB();

const app = express();

// Required for rate limiting to see real client IPs behind a proxy
app.set('trust proxy', 1);

app.use(helmet());

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.error(`CORS blocked origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());

app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'MediCare+ API is running' });
});

app.use('/api/hospitals', hospitalRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});