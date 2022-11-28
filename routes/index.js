const router = require('express').Router();

router.use('/realms', require('./realmRoutes'));
router.use('/biomes', require('./biomeRoutes'));
router.use('/ecoregions', require('./ecoRoutes'));

router.use('/classes', require('./classRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/families', require('./familyRoutes'));
router.use('/genera', require('./genusRoutes'));
router.use('/species', require('./speciesRoutes'));

router.use('/api', require('./api'));

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/contact', (req, res) => {
    res.render('contact-support');
})

module.exports = router;