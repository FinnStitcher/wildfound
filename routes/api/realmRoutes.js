const router = require('express').Router();
const {getRealms, getOneRealm} = require('../../controllers/realmController');

// get all
router.route('/').get(getRealms);

// get by id
router.route('/:realmID').get(getOneRealm);

module.exports = router;