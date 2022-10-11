const router = require('express').Router();

const {Ecoregion, Species} = require('../models');

router.get('/:ecoID', async (req, res) => {
    const {ecoID} = req.params;

    const dbResponse = await Ecoregion.findOne({
        where: {
            id: ecoID
        },
        attributes: ['id', 'ecoregion_name'],
        include: [
            {
                model: Species,
                attributes: ['id', 'species_name'],
                as: 'species'
            }
        ]
    });

    const data = dbResponse.get({plain: true});

	res.render('search-ecoregion', {data});
});

module.exports = router;