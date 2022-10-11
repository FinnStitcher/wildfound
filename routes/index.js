const router = require('express').Router();

router.use('/realms', require('./realmRoutes'));
router.use('/biomes', require('./biomeRoutes'));

module.exports = router;