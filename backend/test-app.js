const request = require('supertest');
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const { errorHandler } = require('./src/middleware/errorHandler');

// Mock User model
jest = { fn: () => {} }; // Mocking just in case
const User = require('./src/models/User');
User.findOne = async () => null;
User.create = async () => { throw new Error('Mock error in create'); };

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

request(app)
  .post('/api/auth/register')
  .send({ name: 'test', email: 'test@example.com', password: 'password', phone: '123' })
  .expect(500)
  .end(function(err, res) {
    if (err) throw err;
    console.log(res.body);
  });
