const router = require('express').Router();
const path = require('path');

router.use('/realms', require('./realmRoutes'));
router.use('/biomes', require('./biomeRoutes'));
router.use('/ecoregions', require('./ecoRoutes'));

module.exports = router;