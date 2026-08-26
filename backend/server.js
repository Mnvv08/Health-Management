const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const { errorHandler } = require('./src/middleware/errorHandler');

const hospitalRoutes = require('./src/routes/hospitalRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'MediCare+ API is running'
  });
});

// Error handling middleware (must be registered after all routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
