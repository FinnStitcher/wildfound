const router = require('express').Router();

const { Genus, Species, CommonName } = require('../models');

router.get('/:genusID', async (req, res) => {
    const {genusID} = req.params;

    const dbResponse = await Genus.findOne({
        where: {
            id: genusID
        },
        attributes: ['id', 'genus_name'],
        include: {
            model: Species,
            attributes: ['id', 'species_name'],
            include: {
                model: CommonName,
                attributes: ['id', 'common_name']
            }
        }
    });

    const data = dbResponse.get({plain: true});
    console.log(data);

	res.render('search-genus', { data });
});

module.exports = router;