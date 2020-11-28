const config = require('./config.json');
const mongo = require('mongoose');
const userFactory = require('../entities/user.entity');
const diaryFactory = require('../entities/diary.entity')
const bcrypt = require('bcryptjs');

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
            return "wrong username and password combination";
        }
        else if (userParam.accountId) {
            let loginResult = await userFactory.loginById(userParam.accountId, password);
            if (loginResult) {
                return "successful login";
            }
            return "wrong accountId and password combination";
        }
        else {
            return "accountId or username is not given";
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
        let token = await userFactory.register(user, pass, id);
        if (token) {
            diaryFactory.createDiary(id);
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
        return "duplicate accountId";
    }
}

/**
 * get user by accountId
 *
 * @param {JSON} userParam
 * @return {userModel} a user instance of userModel
 *      when err or user not found, user = null
 */
async function getById(userParam) {
    let queryId = await userFactory.findById(userParam.accountId);
    if (queryId == null) {
        return "id DNE";
    } else {
        return "successful query - id";
    }
}

/**
 * get user by username
 *
 * @param {JSON} userParam
 * @return {userModel} a user instance of userModel
 *      when err or user not found, user = null
 */
async function getByName(userParam) {
    let queryName = await userFactory.findByName(userParam.username);
    if (queryName == null){
        return "Name DNE";
    } else {
        return "successful query - name";
    }
}

/**
 * get user by username OR accountid
 *
 * @param {JSON} userParam
 * @return {userModel} a user instance of userModel
 *      when err or user not found, user = null
 */
async function getByEither(userParam){
    if (userParam.username) {
        getByName(userParam);
    } else {
        getById(userParam);
    }
}

/**
 * update user by accountid
 *
 * @param {JSON} userParam
 * @return {boolean} when a user is successfully found and updated
 *      when err, user not found, or no update is valid, return false
 */
async function update(userParam){
    let updateEmail = await userFactory.setEmail(userParam.accountId, userParam.email);
    let updateGender = await userFactory.setGender(userParam.accountId, userParam.gender);
    let updatPhone = await userFactory.setPhone(userParam.accountId, userParam.phone);
    let updatetAddress = await userFactory.setAddress(userParam.accountId, userParam.address);
    let updateBirth = await userFactory.setBirth(userParam.accountId, userParam.birth);

    if (updateEmail || updateGender || updatPhone || updatetAddress || updateBirth) return "successful";
    else return "update failed";

}

/**
 * delete user by accountid
 *
 * @param {JSON} userParam
 * @return {boolean} when a user is successfully found and deleted
 *      when err or user not found, return false
 */
async function _delete(userParam) {
    let del = await userFactory.delByID(userParam.accountId);
    if (!del){
        return "del failed";
    } else {
        return "successful";
    }
    return "u suck";
}
