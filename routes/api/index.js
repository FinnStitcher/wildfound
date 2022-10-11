const router = require('express').Router();

const realmRoutes = require('./realmRoutes');
const ecoregionRoutes = require('./ecoregionRoutes');

router.use('/realms', realmRoutes);
router.use('/ecoregions', ecoregionRoutes);

module.exports = router;