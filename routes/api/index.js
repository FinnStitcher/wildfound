const router = require('express').Router();

const {getSpeciesByFamily, createOrder, createSpecies, modifySpecies, modifyGenus, modifyFamily, deleteOrder} = require('./functions');

router.route('/orders').post(createOrder).delete(deleteOrder);
router.route('/families').put(modifyFamily);
router.route('/families/species').get(getSpeciesByFamily);
router.route('/genera').put(modifyGenus);
router.route('/species').post(createSpecies).put(modifySpecies);

module.exports = router;