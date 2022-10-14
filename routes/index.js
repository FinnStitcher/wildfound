const router = require('express').Router();
const {createOrder} = require('./api');

router.use('/realms', require('./realmRoutes'));
router.use('/biomes', require('./biomeRoutes'));
router.use('/ecoregions', require('./ecoRoutes'));

router.use('/classes', require('./classRoutes'));
router.use('/genera', require('./genusRoutes'));
router.use('/species', require('./speciesRoutes'));

router.post(createOrder);

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;