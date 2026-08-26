const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const express = require('express');
const request = require('supertest');
const authRoutes = require('./src/routes/authRoutes');
const { errorHandler } = require('./src/middleware/errorHandler');

process.env.JWT_SECRET = 'testsecret';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const res = await request(app)
    .post('/api/auth/register')
    .send({
      name: "Test",
      email: "test@test.com",
      password: "password123",
      phone: "1234567890"
    });

  console.log('Response:', res.body);
  process.exit(0);
})();
