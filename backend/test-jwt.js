const jwt = require('jsonwebtoken');
try {
  jwt.sign({ id: 1 }, undefined, { expiresIn: '7d' });
} catch (e) {
  console.log(e.message);
}
