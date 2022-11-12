const router = require('express').Router();

const {Order, Family, Class, OrderCommonName} = require('../models');

router.get('/', async (req, res) => {
    res.render('orders-home');
})

router.get('/:orderID', async (req, res) => {
    const {orderID} = req.params;

    const dbResponse = await Order.findOne({
        where: {
            id: orderID
        },
        attributes: ['id', 'order_name'],
        include: [
            {
                model: Family,
                attributes: ['id', 'family_name']
            },
            {
                model: Class,
                attributes: ['id', 'class_name']
            },
            {
                model: OrderCommonName,
                attributes: ['id', 'order_common_name']
            }
        ]
    });

    const data = dbResponse.get({plain: true});

    res.render('search-lg-taxon', {data, subdata: data.families, isOrder: true});
});

module.exports = router;