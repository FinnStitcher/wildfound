const router = require('express').Router();

const {Family, Genus, Order} = require('../models');

router.get('/', async (req, res) => {
    res.render('families-home');
});

router.get('/:familyID', async (req, res) => {
    const {familyID} = req.params;

    const dbResponse = await Family.findOne({
        where: {
            id: familyID
        },
        attributes: ['id', 'family_name'],
        include: [
            {
                model: Genus,
                attributes: ['id', 'genus_name']
            },
            {
                model: Order,
                attributes: ['id', 'order_name']
            }
        ]
    });

    const data = dbResponse.get({plain: true});

    res.render('search-lg-taxon', {data, subdata: data.genera, isFamily: true});
});

module.exports = router;