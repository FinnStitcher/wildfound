const {Op} = require('sequelize');

const {Class, Order, Family, Genus, Species} = require('../../models');

// GET
async function getFamilies(req, res) {
    const {search} = req.query;
    // replace dashes with spaces
    const searchTerm = search.replace(/-/g, ' ');

    const dbResponse = await Family.findAll({
        where: {
            family_name: {
                [Op.regexp]: searchTerm
            }
        },
        include: [
            {
                model: Order,
                attributes: ['order_name', 'id']
            }
        ]
    });

    const data = dbResponse.map(element => element.get({plain: true}));

    res.json(data);
};

module.exports = {
    getFamilies
};