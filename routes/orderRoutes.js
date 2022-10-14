const router = require('express').Router();

const {Order, Family} = require('../models');

router.get('/:orderID', async (req, res) => {
    const {orderID} = req.params;

    const dbResponse = await Order.findOne({
        where: {
            id: orderID
        },
        attributes: ['id', 'order_name'],
        include: {
            model: Family,
            attributes: ['id', 'family_name']
        }
    });

    const data = dbResponse.get({plain: true});

    res.render('search-lg-taxon', {data, subdata: data.families});
});

module.exports = router;