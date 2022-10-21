const router = require('express').Router();
const {Op} = require('sequelize');

const {Realm, Biome, Ecoregion, Species, Genus, Class, Order, CommonName} = require('../models');

router.get('/', async (req, res) => {
    if (req.query.search) {
        const {search} = req.query;

        // get dashes out of search term
        const searchTerm = search.replace(/-/g, ' ');

        // make db search looking for names matching search term
        // Op.regexp turns it into a regular expression automatically
        // case insensitive too
        // very polite
        const dbQueryResponse = await Ecoregion.findAll({
            where: {
                ecoregion_name: {
                    [Op.regexp]: searchTerm
                }
            }
        });

        const queryData = dbQueryResponse.map(element => element.get({plain: true}));
        
        console.log(queryData);
    }

    res.render('ecos-home');
});

router.get('/:ecoID', async (req, res) => {
    const {ecoID} = req.params;

    // get this ecoregion and all connected species, as well as the biome and realm
    const dbResponse1 = await Ecoregion.findOne({
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
    const data1 = dbResponse1.get({plain: true});

    // create array of species ids
    const speciesIds = [];
    data1.species.forEach(element => {
        speciesIds.push(element.id);
    });

    // get class-order-species stack
    const dbResponse2 = await Class.findAll({
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
    const data2 = dbResponse2.map(element => element.get({plain: true}));

	res.render('search-ecoregion', {ecoData: data1, speciesData: data2});
});

module.exports = router;