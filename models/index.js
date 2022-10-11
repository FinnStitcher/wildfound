const Realm = require('./Realm');
const Biome = require('./Biome');
const Ecoregion = require('./Ecoregion');

const Order = require('./Order');
const Class = require('./Class');
const Family = require('./Family');
const Genus = require('./Genus');
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

// one class <-> many orders
Order.belongsTo(Class, {
    foreign_key: 'class_id'
});

Class.hasMany(Order, {
    foreign_key: 'class_id'
});

// one order <-> many families
Family.belongsTo(Order, {
    foreign_key: 'order_id'
});

Order.hasMany(Family, {
    foreign_key: 'order_id'
});

// one family <-> many genera
Genus.belongsTo(Family, {
    foreign_key: 'family_id'
});

Family.hasMany(Genus, {
    foreign_key: 'family_id'
});

// one genus <-> many species
Species.belongsTo(Genus, {
    foreign_key: 'genus_id'
});

Genus.hasMany(Species, {
    foreign_key: 'genus_id'
});

// one class <-> many species
Species.belongsTo(Class, {
    foreign_key: 'class_id'
});

Class.hasMany(Species, {
    foreign_key: 'class_id'
});

module.exports = {
    Realm,
    Biome,
    Ecoregion,
    Species,
    Genus,
    Family,
    Class,
    Order,
    EcoregionSpecies
};