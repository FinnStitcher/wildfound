const router = require('express').Router();

router.use('/realms', require('./realmRoutes'));
router.use('/biomes', require('./biomeRoutes'));
router.use('/ecoregions', require('./ecoRoutes'));

router.use('/genera', require('./genusRoutes'));

router.use('/fix', require('./updateRoutes'));

module.exports = router;