const router = require('express').Router();

const {Genus, Species, Ecoregion, Realm, CommonName} = require('../models');

router.get('/', async (req, res) => {
    res.render('species-home');
});

router.get('/:speciesID', async (req, res) => {
    const {speciesID} = req.params;

    // get realm-ecoregion-species data stack
    const dbGeoData = await Realm.findAll({
        attributes: ['id', 'realm_name'],
        include: {
            model: Ecoregion,
            attributes: ['id', 'ecoregion_name'],
            include: {
                model: Species,
                as: 'species',
                attributes: ['id', 'species_name'],
                where: {
                    id: speciesID
                }
            }
        }
    });
    const geoData = dbGeoData.map(element => element.get({plain: true}));
    
    // get rid of any realms where this species is not found
    // returns true if there's an element in the ecoregions array
    const cleanedGeoData = geoData.filter(element => element.ecoregions[0]);

    // get species data by itself
    const dbSpeciesData = await Species.findOne({
        where: {
            id: speciesID
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
    });
    const speciesData = dbSpeciesData.get({plain: true});

    // double check that this species is actually associated with any ecoregions
    if (cleanedGeoData[0]) {
        res.render('search-species', {geoData: cleanedGeoData, speciesData});
    } else {
        res.render('search-species', {geoData: null, speciesData})
    }
});

module.exports = router;