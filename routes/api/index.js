const router = require('express').Router();

const {getEcoregions} = require('./geoApiRoutes');
const {getOrders, getFamilies, getGenera, getSpecies, getSpeciesByFamily} = require('./getTaxonRoutes');
const {createOrder, createSpecies} = require('./postTaxonRoutes');
const {modifyFamily, modifyGenus, modifySpecies} = require('./putTaxonRoutes');
const {deleteOrder} = require('./delTaxonRoutes');

router.route('/ecoregions').get(getEcoregions);

router.route('/orders').get(getOrders).post(createOrder).delete(deleteOrder);
router.route('/families').get(getFamilies).put(modifyFamily);
router.route('/families/species').get(getSpeciesByFamily);
router.route('/genera').get(getGenera).put(modifyGenus);
router.route('/species').get(getSpecies).post(createSpecies).put(modifySpecies);

module.exports = router;