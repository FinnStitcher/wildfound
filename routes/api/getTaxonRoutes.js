const {Op} = require('sequelize');

const {Class, Order, Family, Genus, Species, CommonName} = require('../../models');

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

async function getGenera(req, res) {
    const {search} = req.query;
    // replace dashes with spaces
    const searchTerm = search.replace(/-/g, ' ');

    const dbResponse = await Genus.findAll({
        where: {
            genus_name: {
                [Op.regexp]: searchTerm
            }
        },
        include: [
            {
                model: Family,
                attributes: ['family_name', 'id']
            }
        ]
    });

    const data = dbResponse.map(element => element.get({plain: true}));

    res.json(data);
};

async function getSpecies(req, res) {
    const {search} = req.query;
    // replace dashes with spaces
    const searchTerm = search.replace(/-/g, ' ');

    let data = null;

    const dbResponse = await Species.findAll({
        where: {
            species_name: {
                [Op.regexp]: searchTerm
            }
        },
        include: [
            {
                model: CommonName,
                attributes: ['common_name', 'id']
            },
            {
                model: Genus,
                attributes: ['genus_name', 'id']
            }
        ]
    });
    data = dbResponse.map(element => element.get({plain: true}));
    
    // if searching by scientific name didn't work, try common names
    if (!data.length) {
        const dbResponse2 = await CommonName.findAll({
            where: {
                common_name: {
                    [Op.regexp]: searchTerm
                }
            },
            include: [
                {
                    model: Species,
                    attributes: ['species_name', 'id'],
                    include: {
                        model: Genus,
                        attributes: ['genus_name', 'id']
                    }
                }
            ]
        });
        data = dbResponse2.map(element => element.get({plain: true}));
    };

    res.json(data);
}

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
    getGenera,
    getSpecies,
    getSpeciesByFamily
};