const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser } = require('../controllers/authcontroller.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;
