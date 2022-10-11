const router = require('express').Router();

const {Biome, Ecoregion, Realm} = require('../models');

router.get('/', async (req, res) => {
    const dbResponse = await Biome.findAll();

    const data = dbResponse.map(element => element.get({plain: true}));

	res.render('list-biomes', {data});
});

router.get('/:biomeID', async (req, res) => {
    const {biomeID} = req.params;

    // easiest way to get realm and ecoregion data matching this biome
    const dbResponse = await Realm.findAll({
        attributes: ['id', 'realm_name'],
        include: [
            {
                model: Ecoregion,
                attributes: ['id', 'ecoregion_name'],
                where: {
                    biome_id: biomeID
                }
            }
        ]
    })

    const data = dbResponse.map(element => element.get({plain: true}));

	res.render('search-biome', {data});
});

module.exports = router;