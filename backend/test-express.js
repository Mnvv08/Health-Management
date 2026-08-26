const express = require('express');
const app = express();
app.use(express.json());

const registerUser = async (req, res, next) => {
  try {
    throw new Error('Test error');
  } catch (error) {
    next(error);
  }
};

const router = express.Router();
router.post('/register', registerUser);
app.use('/api/auth', router);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const server = app.listen(5005, async () => {
  try {
    const response = await fetch('http://localhost:5005/api/auth/register', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({}) });
    const json = await response.json();
    console.log("Response:", json);
  } catch (e) {
    console.log("Fetch error:", e.message);
  }
  server.close();
});
