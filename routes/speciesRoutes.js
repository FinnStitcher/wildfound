const router = require('express').Router();

const {Genus, Species, Ecoregion, Realm, CommonName} = require('../models');

router.get('/:speciesID', async (req, res) => {
    const {speciesID} = req.params;

    const dbResponse = await Species.findOne({
        where: {
            id: speciesID
        },
        attributes: ['id', 'species_name'],
        include: [
            {
                model: CommonName,
                attributes: ['id', 'common_name']
            },
            {
                model: Genus,
                attributes: ['id', 'genus_name']
            },
            {
                model: Ecoregion,
                as: 'ecoregions',
                attributes: ['id', 'ecoregion_name'],
                include: {
                    model: Realm,
                    attributes: ['id', 'realm_name']
                }
            }
        ]
    });
    const data = dbResponse.get({plain: true});

    res.render('search-species', {data});
});

module.exports = router;