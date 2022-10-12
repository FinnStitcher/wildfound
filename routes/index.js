const router = require('express').Router();

router.use('/realms', require('./realmRoutes'));
router.use('/biomes', require('./biomeRoutes'));
router.use('/ecoregions', require('./ecoRoutes'));

router.use('/genera', require('./genusRoutes'));
router.use('/species', require('./speciesRoutes'));

router.use('/fix', require('./updateRoutes'));

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;