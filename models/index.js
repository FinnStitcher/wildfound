const Realm = require('./Realm');
const Biome = require('./Biome');
const Ecoregion = require('./Ecoregion');

const Species = require('./Species');

const EcoregionSpecies = require('./EcoregionSpecies');

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

// many ecoregions <-> many species
Ecoregion.belongsToMany(Species, {
    through: EcoregionSpecies,
    as: 'species',
    foreignKey: 'ecoregion_id'
});

Species.belongsToMany(Ecoregion, {
    through: EcoregionSpecies,
    as: 'ecoregions',
    foreignKey: 'species_id'
});

module.exports = {
    Realm,
    Biome,
    Ecoregion,
    Species,
    EcoregionSpecies
};