const router = require('express').Router();

const {Ecoregion, Species, Genus, Family, Class, Order} = require('../models');

router.get('/:ecoID', async (req, res) => {
    const {ecoID} = req.params;

    // get this grouped by order later lol
    const dbResponse = await Ecoregion.findOne({
        where: {
            id: ecoID
        },
        attributes: ['id', 'ecoregion_name'],
        include: [
            {
                model: Species,
                attributes: ['id', 'species_name'],
                as: 'species',
                include: {
                    model: Genus,
                    attributes: ['id'],
                    include: {
                        model: Family,
                        attributes: ['id'],
                        include: {
                            model: Order,
                            attributes: ['id'],
                            include: {
                                model: Class,
                                attributes: ['id', 'class_name']
                            }
                        }
                    }
                }
            }
        ]
    });

    const data = dbResponse.get({plain: true});
    console.log(data);

	res.render('search-ecoregion');
});

module.exports = router;