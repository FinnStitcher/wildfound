const router = require('express').Router();
const { Ecoregion, Realm, Biome } = require('../../models');

// get all
// w biome and realm names
router.get('/', (req, res) => {
    Ecoregion.findAll({
        attributes: ['id', 'ecoregion_name'],
        include: [
            {
                model: Realm,
                attributes: ['realm_name']
            },
            {
                model: Biome,
                attributes: ['biome_name']
            }
        ]
    })
    .then(dbEcoData => res.json(dbEcoData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get by id
// w biome and realm names
router.get('/:id', (req, res) => {
    Ecoregion.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'ecoregion_name'],
        include: [
            {
                model: Realm,
                attributes: ['realm_name']
            },
            {
                model: Biome,
                attributes: ['biome_name']
            }
        ]
    })
    .then(dbEcoData => res.json(dbEcoData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;