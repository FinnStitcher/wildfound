const router = require('express').Router();

const { Biome, Ecoregion } = require('../models');

router.get('/', (req, res) => {
	res.render('list-realms');
});

router.get('/:realmID', async (req, res) => {
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

module.exports = router;