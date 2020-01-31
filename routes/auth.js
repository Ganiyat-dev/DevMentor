const express = require('express');

const router = express.Router();
const {
  register,
  login,
  getMe,
  forgetpassword,
  resetpassword
} = require('../controllers/auth');
const { protect } = require('../middleware/protect');

router.post('/register', register);
router.post('/login', login);
router.post('/forgetpassword', forgetpassword);
router.patch('/resetpassword/:token', resetpassword);

router.route('/me').get(protect, getMe);

module.exports = router;
