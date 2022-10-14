// functions for modifying the database
const {Order} = require('../models');

// POST

async function createOrder(req, res) {
    const {body} = req;

    let dbResponse;

    if (typeof body === 'object') {
        dbResponse = await Order.bulkCreate(body);
    } else {
        dbResponse = await Order.create(body);
    }

    const data = dbResponse.get({plain: true});
    res.json(data);
};
// create new order
// create new common name

// PUT

// modify family
// modify genus
// modify species
// modify common name

module.exports = {createOrder};