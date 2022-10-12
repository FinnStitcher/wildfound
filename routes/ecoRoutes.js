const router = require('express').Router();

const {Ecoregion, Species, Genus, Class, Order, CommonName} = require('../models');

router.get('/:ecoID', async (req, res) => {
    const {ecoID} = req.params;

    // get this ecoregion and all connected species
    const dbResponse1 = await Ecoregion.findOne({
        where: {
            id: ecoID
        },
        attributes: ['id', 'ecoregion_name'],
        include: {
            model: Species,
            as: 'species',
            attributes: ['id', 'species_name']
        }
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

	res.render('search-ecoregion', {data: data2});
});

module.exports = router;