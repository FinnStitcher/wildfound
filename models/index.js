const Realm = require('./Realm');
const Biome = require('./Biome');
const Ecoregion = require('./Ecoregion');

// many ecoregions <-> one biome
Ecoregion.belongsTo(Biome, {
    foreign_key: 'biome_id'
});

Biome.hasMany(Ecoregion, {
    foreign_key: 'biome_id'
});

// many ecoregions <-> one realm
Ecoregion.belongsTo(Realm, {
    foreign_key: 'realm_id'
});

Realm.hasMany(Ecoregion, {
    foreign_key: 'realm_id'
});

module.exports = {
    Realm,
    Biome,
    Ecoregion
};