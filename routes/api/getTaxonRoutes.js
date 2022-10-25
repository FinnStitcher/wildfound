const {Op} = require('sequelize');

const {Class, Order, Family, Genus, Species} = require('../../models');

// GET
async function getOrders(req, res) {
    const {search} = req.query;
    const searchTerm = search.replace(/-/g, ' ');

    const dbResponse = await Order.findAll({
        where: {
            order_name: {
                [Op.regexp]: searchTerm
            }
        },
        include: [
            {
                model: Class,
                attributes: ['class_name', 'id']
            }
        ]
    });

    const data = dbResponse.map(element => element.get({plain: true}));

    res.json(data);
};

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

async function getSpeciesByFamily(req, res) {
    const {idArray} = req.body;

    let speciesIds = [];

    const dbResponse = await Family.findAll({
        where: {
            id: [...idArray]
        },
        include: {
            model: Genus,
            include: {
                model: Species
            }
        }
    });

    dbResponse.forEach(family => {
        family.genera.forEach(genus => {
            genus.species.forEach(species => {
                speciesIds.push(species.id)
            })
        })
    });

    res.json(speciesIds);
};

module.exports = {
    getOrders,
    getFamilies,
    getSpeciesByFamily
};