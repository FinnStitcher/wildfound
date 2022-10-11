const router = require('express').Router();

router.get('/realms', (req, res) => {
    res.render('search-realm');
});

router.get('/realms/:realmId', (req, res) => {
    res.render('search-realm', {params: req.params.realmId});
});

module.exports = router;