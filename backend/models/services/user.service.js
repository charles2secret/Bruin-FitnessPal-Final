const config = require('./config.json');
const mongo = require('mongoose');
const userFactory = require('../entities/user.entity');
const bcrypt = require('bcryptjs');

//TODO: make sure to read all TODOs before start
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

//TODO: make sure add to export module after writing your function
var service = {};
service.authenticate = authenticate;
service.getByEither = getByEither;
service.getByName = getByName;
service.getById = getById;
service.register = register;
service.update = update;
service.delete = _delete;
//add export functions here....
module.exports = service;

/**
 * authenticate if user meets login credential
 * allows both login by accountId and username
 *
 * @param {JSON} userParam
 * @return {userModel} a user instance of userModel
 *      when err or user not found, user = null
 */
async function authenticate(userParam){
    try {
        let password = userParam.password;
        if (userParam.username) {
            let loginResult = await userFactory.loginByName(userParam.username, password);
            if (loginResult) {
                return "successful login";
            }
            return "wrong username password combination"
        }
        else {
            let loginResult = await userFactory.loginById(userParam.accountId, password);
            if (loginResult) {
                return "successful login";
            }
            return "wrong username password combination"
        }

    } catch (err) {
        return err;
    }
}

async function register(userParam) {
    let queryName = await userFactory.findByName(userParam.username);
    let queryId = await userFactory.findById(userParam.accountId);
    //if user not found in database
    //TODO: implement security feature on password (bcrypt)
    if (queryName == null && queryId == null) {
        let user = userParam.username;
        let pass = userParam.password;
        let id = userParam.accountId;
        let token = userFactory.register(user, pass, id);
        if (token) {
            await userFactory.setEmail(id, userParam.email);
            await userFactory.setGender(id, userParam.gender);
            return "successful registration";
        }
        return "unknown err when saving to database";
    }
    if (queryName != null && queryId != null) {
        return "duplicate accountId and username";
    }
    else if (queryName != null) {
        return "duplicate username";
    }
    else {
        return "duplicate accountID";
    }
}

async function getById(userParam) {
    let queryId = await userFactory.findById(userParam.accountId);
    if (queryId == null) {
        return "id DNE";
    } else {
        return "successful query - id";
    }
}

async function getByName(userParam) {
    let queryName = await userFactory.findByName(userParam.username);
    if (queryName == null){
        return "Name DNE";
    } else {
        return "successful query - name";
    }
}

async function getByEither(userParam){
    if (userParam.username) {
        getByName(userParam);
    } else {
        getById(userParam);
    }
}

async function update(userParam) {
    
}

async function _delete() {

}

//notes: why not just write all code in user.service.js?
//       isn't that what this class is for? we already have a controller class...
/*
    well traditionally, model layer actually handles all the request with model
    so user.service is really *not* another layer of controller,
    it mixes or utilizes variety of functions in entity to fulfill request from
    the controller class.

    This is in fact MVC 2 (MVC + S) where service is another layer inside the model
 */

//TODO: read TODO in user.entity.js first
//  1. write function update(), _delete() (be sure to use async if possible)
//  2. implement any functions you may need in user.entity.js
//  3. implement controller function in users.controller.js
//  4. test three functions together for bugs, correctness, robustness before push


