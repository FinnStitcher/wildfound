const router = require('express').Router();

const {Ecoregion, Species, Genus, Family, Class, Order} = require('../models');

router.get('/:ecoID', async (req, res) => {
    const {ecoID} = req.params;

    // get this grouped by order later lol
    // const dbResponse = await Ecoregion.findOne({
    //     where: {
    //         id: ecoID
    //     },
    //     attributes: ['id', 'ecoregion_name'],
    //     include: {
    //             model: Species,
    //             attributes: ['id', 'species_name'],
    //             as: 'species',
    //             include: {
    //                 model: Class,
    //                 attributes: 
    //             }
    //         }
    //     }
    // );
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
                }
            ]
        }
    });

    const data = dbResponse.map(element => element.get({plain: true}));

	res.render('search-ecoregion', {data});
});

module.exports = router;