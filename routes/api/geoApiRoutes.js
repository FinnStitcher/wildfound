const {Op} = require('sequelize');

const {Ecoregion, Realm, Biome, Order, Class, Family, Genus, Species} = require('../../models');

// GET
async function getEcoregions(req, res) {
    const {search} = req.query;
    // turn dashes back into spaces
    const searchTerm = search.replace(/-/g, ' ');

    // make db search looking for names matching search term
    // Op.regexp turns it into a regular expression automatically
    // case insensitive too
    // very polite
    const dbResponse = await Ecoregion.findAll({
        where: {
            ecoregion_name: {
                [Op.regexp]: searchTerm
            }
        },
        include: [
            {
                model: Realm,
                attributes: ['realm_name', 'id']
            },
            {
                model: Biome,
                attributes: ['biome_name', 'id']
            }
        ]
    });

    const data = dbResponse.map(element => element.get({plain: true}));

    res.json(data);
};

// DELETE

async function deleteOrder(req, res) {
    const {idArray} = req.body;

    const dbResponse = await Order.destroy({
        where: {
            id: [...idArray]
        }
    });

    res.json(dbResponse);
}

module.exports = {getEcoregions};