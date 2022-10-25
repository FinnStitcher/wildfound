const router = require('express').Router();

const {getEcoregions, getOrders, getSpeciesByFamily, createOrder, createSpecies, modifySpecies, modifyGenus, modifyFamily, deleteOrder} = require('./functions');

router.route('/ecoregions').get(getEcoregions);

router.route('/orders').get(getOrders).post(createOrder).delete(deleteOrder);
router.route('/families').put(modifyFamily);
router.route('/families/species').get(getSpeciesByFamily);
router.route('/genera').put(modifyGenus);
router.route('/species').post(createSpecies).put(modifySpecies);

module.exports = router;