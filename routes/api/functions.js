const {Op} = require('sequelize');

const {Ecoregion, Realm, Biome, Order, Family, Genus, Species} = require('../../models');

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
}

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

// create new order
// create new common name

// PUT

async function modifyFamily(req, res) {
    const {idArray, newData} = req.body;

    const dbResponse = await Family.update(
        {...newData},
        {where: {
            id: [...idArray]
        }}
    );

    res.json(dbResponse);
}

async function modifyGenus(req, res) {
    const {idArray, newData} = req.body;

    const dbResponse = await Genus.update(
        {...newData},
        {where: {
            id: [...idArray]
        }}
    );

    res.json(dbResponse);
}

async function modifySpecies(req, res) {
    const {idArray, newData} = req.body;

    const dbResponse = await Species.update(
        {...newData},
        {where: {
            id: [...idArray]
        }}
    );

    res.json(dbResponse);
}

// modify family
// modify genus
// modify species
// modify common name

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

module.exports = {getEcoregions, getSpeciesByFamily, createOrder, createSpecies, modifyFamily, modifyGenus, modifySpecies, deleteOrder};