const {Realm, Biome, Ecoregion} = require('../models');

// get all realms w/ names
function getRealms (req, res) {
    Realm.findAll({
        attributes: ['id', 'realm_name']
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

// get 1 realm, its ecoregions, and the associated biomes
function getOneRealm (req, res) {
    const {realmID} = req.params;

    // there's no realm-biome table, so i'm hacking this a little
    Biome.findAll({
        attributes: ['id', 'biome_name'],
        include: [
            {
                model: Ecoregion,
                attributes: ['id', 'ecoregion_name'],
                where: {
                    realm_id: realmID
                }
            }
        ]
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
};

module.exports = {
    getRealms,
    getOneRealm
};