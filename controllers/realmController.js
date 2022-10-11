const {Realm, Biome, Ecoregion} = require('../models');

// get all realms w/ names
function getRealms (req, res) {
    Realm.findAll({
        attributes: ['id', 'realm_name']
    })
    .then(realmData => res.json(realmData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

// get 1 realm, its ecoregions, and the associated biomes
function getOneRealm (req, res) {
    const {realmID} = req.params;

    Realm.findOne({
        where: {
            id: req.params
        },
        attributes: ['id', 'realm_name'],
        include: [
            {
                model: Ecoregion,
                attributes: ['ecoregion_name']
            },
            {
                model: Biome,
                attributes: ['biome_name']
            }
        ]
    })
    .then(realmData => res.json(realmData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
};

module.exports = {
    getRealms,
    getOneRealm
};