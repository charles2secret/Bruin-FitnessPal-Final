var express = require('express');
var router = express.Router();
const axios = require("axios");

/* GET home page. */
/*
router.get('/', function(req, res, next) {
    res.render('index',{ title: 'express'});
});


 */

router.get("/", async (req, res) => {
    const query = await axios.get("https://randomuser.me/api/?results=9");
    res.render("index", { users: query.data.results });
});

router.get("/docs", async (req, res)=> {

});

module.exports = router;
