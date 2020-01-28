const express = require('express');
const router = express.Router({ mergeParams: true });

const { getCourse } = require('../controllers/courses');

router.route('/').get(getCourse);

module.exports = router;
