const config = require('./config.json');
const bcrypt = require('bcryptjs');
const userEntity = require('../entities/user.entity');
const mongo = require('mongoose');

const db = mongo.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
}).then(
    () => {console.log("MongoDB Running")},
    err => {console.log("DB Connection Failed")}
);

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(){}
function getById() {}
function create() {}
function update() {}
function _delete() {}



