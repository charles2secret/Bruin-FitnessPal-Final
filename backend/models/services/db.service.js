const config = require('./config.json');
const mongo = require('mongoose');

/*
const db = mongo.connect(config.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
}).then(
    () => {console.log("MongoDB Running")},
    err => {console.log("DB Connection Failed")}
);


 */
/*
var service = {}
service.getConnection = getConnection;
module.exports = service;

function getConnection() {
    return Promise.resolve(db);
}

 */
