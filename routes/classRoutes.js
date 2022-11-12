const router = require('express').Router();

const {Class, Order} = require('../models');

router.get('/', (req, res) => {
    res.render('classes-home');
});

router.get('/:classID', async (req, res) => {
    const {classID} = req.params;

    const dbResponse = await Class.findOne({
        where: {
            id: classID
        },
        attributes: ['id', 'class_name'],
        include: {
            model: Order,
            attributes: ['id', 'order_name']
        }
    });

    const data = dbResponse.get({plain: true});

    res.render('search-lg-taxon', {data, subdata: data.orders});
});

module.exports = router;