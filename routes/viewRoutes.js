const router = require('express').Router();

const {getRealms} = require('../controllers/realmController');
const { Realm, Biome, Ecoregion } = require('../models');

// realms
router.get('/realms', (req, res) => {
	res.render('list-realms');
});

router.get('/realms/:realmID', async (req, res) => {
    const {realmID} = req.params;

    // get data
    // there's no realm-biome table, so i'm hacking this a little
    const dbResponse = await Biome.findAll({
        attributes: ['id', 'biome_name'],
        include: [
            {
                model: Ecoregion,
                attributes: ['id', 'ecoregion_name'],
                where: {
                    realm_id: realmID
                }
            }
        ]
    });

    const data = dbResponse.map(element => element.get({plain: true}));

	res.render('search-realm', { data });
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
