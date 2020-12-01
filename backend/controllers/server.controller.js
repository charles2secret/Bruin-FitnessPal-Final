const router = require('express-promise-router')();
const axios = require("axios");

router.get("/", async (req, res) => {
    const query = await axios.get("https://randomuser.me/api/?results=9");
    res.render("index", { users: query.data.results });
});

module.exports = router;
