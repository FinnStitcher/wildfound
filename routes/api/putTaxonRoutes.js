const {Class, Order, Family, Genus, Species} = require('../../models');

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
};

async function modifyGenus(req, res) {
    const {idArray, newData} = req.body;

    const dbResponse = await Genus.update(
        {...newData},
        {where: {
            id: [...idArray]
        }}
    );

    res.json(dbResponse);
};

async function modifySpecies(req, res) {
    const {idArray, newData} = req.body;

    const dbResponse = await Species.update(
        {...newData},
        {where: {
            id: [...idArray]
        }}
    );

    res.json(dbResponse);
};

module.exports = {
    modifyFamily,
    modifyGenus,
    modifySpecies
};