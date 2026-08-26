const jwt = require('jsonwebtoken');
try {
  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '7d' });
  console.log('Success:', token);
} catch (e) {
  console.log('Error:', e.message);
}
