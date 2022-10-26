const router = require('express').Router();

const {Genus, Species, Ecoregion, Realm, CommonName} = require('../models');

router.get('/', async (req, res) => {
    res.render('species-home');
});

router.get('/:speciesID', async (req, res) => {
    const {speciesID} = req.params;

    // get realm-ecoregion-species-species data stack
    const dbResponse = await Realm.findAll({
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
    const data = dbResponse.map(element => element.get({plain: true}));
    
    // get rid of any realms where this species is not found
    const cleanedData = data.filter(element => element.ecoregions[0]);
    
    // extract species data
    const [speciesData] = cleanedData[0].ecoregions[0].species;

    res.render('search-species', {data: cleanedData, speciesData});
});

module.exports = router;