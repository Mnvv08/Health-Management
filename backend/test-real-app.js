const mongoose = require('mongoose');
const User = require('./src/models/User');

async function test() {
  await mongoose.connect('mongodb://localhost:27017/medicare-plus');
  await User.deleteMany({ email: 'test@example.com' });
  try {
    const user = await User.create({ name: 'test', email: 'test@example.com', password: 'password', phone: '123' });
    console.log("Success:", user);
  } catch (e) {
    console.log("Error:", e.message);
  }
  mongoose.disconnect();
}
test();
