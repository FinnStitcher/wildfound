const router = require('express').Router();

router.get('/:ecoID', (req, res) => {
	res.render('search-ecoregion');
});

module.exports = router;