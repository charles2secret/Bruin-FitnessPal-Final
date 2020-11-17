var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({
        title: "issues response",
        token: 1,
        status: true
    });
});

module.exports = router;
