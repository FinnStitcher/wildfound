const router = require('express').Router();

const ecoregionRoutes = require('./ecoregionRoutes');

router.use('/ecoregions', ecoregionRoutes);

module.exports = router;