const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('search-biome');
});

router.get('/:biomeId', (req, res) => {
	res.render('search-biome', { params: req.params.biomeId });
});

module.exports = router;