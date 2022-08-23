const router = require('express').Router();
const { Ecoregion, Realm, Biome } = require('../../models');

router.get('/', (req, res) => {
    Ecoregion.findAll()
    .then(dbEcoData => res.json(dbEcoData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;