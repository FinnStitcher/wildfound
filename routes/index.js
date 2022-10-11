const router = require('express').Router();
const path = require('path');

router.use('/api', require('./api'));
router.use('/', require('./viewRoutes'));

module.exports = router;