const userFactory = require('../entities/user.entity');
const diaryFactory = require('../entities/diary.entity')
const bcrypt = require('bcryptjs');

const config = require('./config.json');
const mongo = require('mongoose');

const db = mongo.connect(config.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
}).then(
    () => {console.log("MongoDB Running at user.service.js")},
    err => {console.log("DB Connection Failed")}
);


var service = {};
service.authenticate = authenticate;
service.getByEither = getByEither;
service.getByName = getByName;
service.getById = getById;
service.getPhone = getPhone;
service.getAddress = getAddress;
service.getGender = getGender;
service.getEmail = getEmail;
service.getBirth = getBirth;
service.register = register;
service.update = update;
service.delete = _delete;
service.getFriend = getFriend;
service.addFriend = addFriend;
service.deleteFriend = deleteFriend;
module.exports = service;


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
        //TODO: createDiary()
        if (token) {
            await diaryFactory.createDiary(id);
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


async function getById(userParam) {
    let queryId = await userFactory.findById(userParam.accountId);
    if (queryId == null) {
        return null;
    } else {
        let user = await userFactory.getUserById(userParam.accountId);
        return user;
    }
}


async function getByName(userParam) {
    let queryName = await userFactory.findByName(userParam.username);
    if (queryName == null){
        return null;
    } else {
        let user = await userFactory.getUserByName(userParam.username);
        return user;
    }
}


async function getByEither(userParam){
    if (userParam.username) {
        return getByName(userParam);
    } else {
        return getById(userParam);
    }
}


async function update(userParam){
    let updateEmail = await userFactory.setEmail(userParam.accountId, userParam.email);
    let updateGender = await userFactory.setGender(userParam.accountId, userParam.gender);
    let updatPhone = await userFactory.setPhone(userParam.accountId, userParam.phone);
    let updatetAddress = await userFactory.setAddress(userParam.accountId, userParam.address);
    let updateBirth = await userFactory.setBirth(userParam.accountId, userParam.birth);
    let updatePassword = await userFactory.setPassword(userParam.accountId, userParam.password);
    let updateUsername = await userFactory.setUsername(userParam.accountId, userParam.username);

    if (updateEmail || updateGender || updatPhone ||
        updateUsername || updatetAddress || updateBirth || updatePassword)
        return "successful";
    else return "update failed";

}


async function _delete(userParam) {
    let del = await userFactory.delByID(userParam.accountId);
    if (!del){
        return "del failed";
    } else {
        return "successful";
    }
}


async function getBirth(userParam) {
    let birth = await userFactory.getBirth(userParam.accountId);
    if (birth) {
        return birth;
    } else {
        return null;
    }
}

async function getPhone(userParam) {
    let phone = await userFactory.getPhone(userParam.accountId);
    if (phone) {
        return phone;
    } else {
        return null;
    }
}


async function getEmail(userParam) {
    let email = await userFactory.getEmail(userParam.accountId);
    if (email) {
        return email
    } else {
        return null;
    }
}

async function getAddress(userParam) {
    let address = await userFactory.getAddress(userParam.accountId);
    if (address) {
        return address;
    } else {
        return null;
    }
}


async function getGender(userParam) {
    let gender = await userFactory.getGender(userParam.accountId);
    if (gender) {
        return gender;
    } else {
        return null;
    }
}

//TODO: warning, this function doesn't check if id is not in the db
async function getFriend(userParam) {
    let friendList = await userFactory.getFriend(userParam.accountId);
    return friendList;
}

//TODO: warning, this function doesn't check if id is not in the db
async function addFriend(userParam) {
    let status = await userFactory.checkFriend(userParam.accountId, userParam.friendId);
    if (!status) {
        console.log("friend exist already or user not found");
        return null;
    }
    let friendList = await userFactory.addFriend(userParam.accountId, userParam.friendId);
    if (!friendList) {
        console.log("addFriend failed but friendId is a valid one");
        return friendList;
    }
    else {
        console.log("addFriend success, friend added: " + userParam.friendId);
        return friendList;
    }

}

async function deleteFriend(userParam) {
    let status = await userFactory.checkFriend(userParam.accountId, userParam.friendId);
    if (status) {
        console.log("friend doesn't exist or user not found");
        return null;
    }
    let friendList = await userFactory.deleteFriend(userParam.accountId, userParam.friendId);
    for (let i=0; i<friendList.length; i++){
        if (friendList[i].friendId === userParam.friendId) {
            console.log("delete failed!!!");
            return friendList;
        }
    }
    console.log("oops, you just deleted a friend!");
    return friendList;
}

