const router = require('express').Router();

// realms
router.get('/realms', (req, res) => {
    res.render('search-realm');
});

router.get('/realms/:realmId', (req, res) => {
    res.render('search-realm', {params: req.params.realmId});
});

// biomes
router.get('/biomes', (req, res) => {
    res.render('search-biome');
});

router.get('/biomes/:biomeId', (req, res) => {
    res.render('search-biome', {params: req.params.biomeId});
});

// ecoregions
router.get('/ecoregions/:ecoId', (req, res) => {
    res.render('search-ecoregion', {params: req.params.ecoId});
});

module.exports = router;