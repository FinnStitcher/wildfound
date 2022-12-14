const router = require('express').Router();

const { Genus, Species, CommonName, Family } = require('../models');

router.get('/', async (req, res) => {
    res.render('genera-home');
});

router.get('/:genusID', async (req, res) => {
    const {genusID} = req.params;

    const dbResponse = await Genus.findOne({
        where: {
            id: genusID
        },
        attributes: ['id', 'genus_name'],
        include: [
            {
                model: Species,
                attributes: ['id', 'species_name'],
                include: {
                    model: CommonName,
                    attributes: ['id', 'common_name']
                }
            },
            {
                model: Family,
                attributes: ['id', 'family_name']
            }
        ]
    });

    const data = dbResponse.get({plain: true});

	res.render('search-genus', { data, initial: data.genus_name[0].toUpperCase() });
});

module.exports = router;