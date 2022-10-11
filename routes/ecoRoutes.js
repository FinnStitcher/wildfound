const router = require('express').Router();

const {Ecoregion, Species, Genus, Class, Order, CommonName} = require('../models');

router.get('/:ecoID', async (req, res) => {
    const {ecoID} = req.params;

    // making orders an extra layer in that stack was unacceptably slow
    const dbResponse = await Class.findAll({
        attributes: ['id', 'class_name'],
        include: {
            model: Species,
            attributes: ['id', 'species_name'],
            include: [
                {
                    model: Ecoregion,
                    as: 'ecoregions',
                    attributes: ['id', 'ecoregion_name'],
                    where: {
                        id: ecoID
                    }
                },
                {
                    model: Genus,
                    attributes: ['id', 'genus_name']
                },
                {
                    model: CommonName,
                    attributes: ['id', 'common_name']
                },
                {
                    model: Order,
                    attributes: ['id', 'order_name']
                }
            ]
        }
    });

    const data = dbResponse.map(element => element.get({plain: true}));

	res.render('search-ecoregion', {data});
});

module.exports = router;