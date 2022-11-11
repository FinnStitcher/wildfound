const router = require('express').Router();
const {Op} = require('sequelize');

const {Realm, Biome, Ecoregion, Species, Genus, Class, Order, CommonName} = require('../models');

router.get('/', async (req, res) => {
    res.render('ecos-home');
});

router.get('/:ecoID', async (req, res) => {
    const {ecoID} = req.params;

    // get this ecoregion and all connected species, as well as the biome and realm
    const dbEcoregionsData = await Ecoregion.findOne({
        where: {
            id: ecoID
        },
        attributes: ['id', 'ecoregion_name'],
        include: [
            {
                model: Species,
                as: 'species',
                attributes: ['id', 'species_name']
            },
            {
                model: Biome,
                attributes: ['id', 'biome_name']
            },
            {
                model: Realm,
                attributes: ['id', 'realm_name']
            }
        ]
    });
    const ecoregionsData = dbEcoregionsData.get({plain: true});

    // create array of species ids
    const speciesIds = [];
    ecoregionsData.species.forEach(element => {
        speciesIds.push(element.id);
    });

    // get class-order-species stack
    const dbSpeciesData = await Class.findAll({
        attributes: ['id', 'class_name'],
        include: {
            model: Order,
            attributes: ['id', 'order_name'],
            include: {
                model: Species,
                attributes: ['id', 'species_name'],
                where: {
                    id: [...speciesIds]
                },
                include: [
                    {
                        model: Genus,
                        attributes: ['id', 'genus_name']
                    },
                    {
                        model: CommonName,
                        attributes: ['id', 'common_name']
                    }
                ]
            }
        }
    });
    const speciesData = dbSpeciesData.map(element => element.get({plain: true}));

    // remove any taxa that aren't represented here
    const cleanedSpeciesData = speciesData.filter(element => element.orders[0]);

	res.render('search-ecoregion', {ecoData: ecoregionsData, speciesData: cleanedSpeciesData});
});

module.exports = router;