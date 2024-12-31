



// const express = require('express');
// const { Reigster, VerfiyEmail } = require('../controllers/registerController');

// const registerRoutes = express.Router();

// registerRoutes.post('/register', Reigster);
// registerRoutes.post('/verifyEmail', VerfiyEmail);

// module.exports = registerRoutes;


const express = require('express');
const { Reigster, VerfiyEmail } = require('../controllers/registerController');

const registerRoutes = express.Router();

registerRoutes.post('/register', Reigster);
registerRoutes.post('/verifyEmail', VerfiyEmail);

module.exports = registerRoutes;

