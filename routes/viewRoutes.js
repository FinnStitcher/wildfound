const router = require('express').Router();

const {getRealms} = require('../controllers/realmController');
const { Realm, Biome, Ecoregion } = require('../models');

// realms
router.get('/realms', (req, res) => {
	res.render('list-realms');
});

router.get('/realms/:realmId', (req, res) => {
	res.render('search-realm', { params: req.params.realmId });
});

// biomes
router.get('/biomes', (req, res) => {
	res.render('search-biome');
});

router.get('/biomes/:biomeId', (req, res) => {
	res.render('search-biome', { params: req.params.biomeId });
});

// ecoregions
router.get('/ecoregions/:ecoId', (req, res) => {
	res.render('search-ecoregion', { params: req.params.ecoId });
});

module.exports = router;
