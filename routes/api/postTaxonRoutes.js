const {Class, Order, Family, Genus, Species} = require('../../models');

// POST
async function createOrder(req, res) {
    const {body} = req;

    const dbResponse = await Order.bulkCreate([...body]);

    res.json(dbResponse);
};

async function createSpecies(req, res) {
    const {body} = req;

    const dbResponse = await Species.bulkCreate([...body]);

    res.json(dbResponse);
};

module.exports = {
    createOrder,
    createSpecies
};