const config = require('../config.json');
const mongo = require('mongoose');


mongo.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
}).then(
    () => {console.log("MongoDB Running")},
    err => {console.log("Failed to Establish DB Connection")}
);

