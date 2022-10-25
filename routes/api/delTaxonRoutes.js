const {Class, Order, Family, Genus, Species} = require('../../models');

// DELETE
async function deleteOrder(req, res) {
    const {idArray} = req.body;

    const dbResponse = await Order.destroy({
        where: {
            id: [...idArray]
        }
    });

    res.json(dbResponse);
};

module.exports = {
    deleteOrder
};