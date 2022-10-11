const router = require('express').Router();

router.get('/:ecoId', (req, res) => {
	res.render('search-ecoregion', { params: req.params.ecoId });
});

module.exports = router;
