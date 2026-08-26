const { registerUser } = require('./src/controllers/authController');

const req = { body: {} };
const res = { status: () => res, json: () => {} };
const next = "I am a string!";

registerUser(req, res, next).then(() => console.log("done"));
