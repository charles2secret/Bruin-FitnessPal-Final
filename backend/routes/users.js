var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/log', function(req, res, next) {
  res.send(true);
});

module.exports = router;