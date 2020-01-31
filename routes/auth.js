const express = require('express');

const router = express.Router();
const {
  register,
  login,
  getMe,
  forgetpassword
} = require('../controllers/auth');
const { protect } = require('../middleware/protect');

router.post('/register', register);
router.post('/login', login);
router.post('/forgetpassword', forgetpassword);

router.route('/me').get(protect, getMe);

module.exports = router;
