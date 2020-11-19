const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: make sure add to export module after writing your function
var userFactory = {}
userFactory.findByName = findByName;
userFactory.findById = findById;
userFactory.register = register;
userFactory.setEmail = setEmail;
userFactory.setGender = setGender;
userFactory.loginByName = loginByName;
userFactory.loginById = loginById;
module.exports = userFactory;

const userSchema = new Schema ({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    accountId: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        immutable: true,
        trim: true,
        minlength: 6,
        maxlength: 20
    },
    contact: {
        email: {
            type: String,
            lowercase: true,
            default: "user@BruinFitnessPal.com",
            match:/^(?:(?:[\w\.\-_]+@[\w\d]+(?:\.[\w]{2,6})+)[,;]?\s?)+$/
        },
        phone: {
            type: String,
            match:/[\d]{10}/
        },
        address: {
            type: String,
            default: "USA"
        }
    },
    birth: {
        year: {type: Number, min:1900, max: 2020},
        month: {type: Number, min:0, max:12},
        day: {type:Number, min:0, max:31}
    },
    gender: {
        type: String,
        enum: ['male','female','other']
    }
    }
);

const userModel = mongoose.model('User', userSchema);

/*
    please use async/await in es6 as oppose to Promise library such as Q
    if you are comfortable with writing Promise function by hand, or
    if you are adept at using Q/other promise library, then that's fine

    a general guide into Promise, async, await can be found here:
    https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8#.w234uo7h3

    notes: some say its a good practice for all functions to be async, if:
    any function you call subsequently is async

    I made all functions async, and so far nothing wrong (I only have basic understanding of
    promise, so I might be wrong.

    note!!! await basically stops the program until a Promise object is returned,
    if you don't solve the Promise, then instead of your queryResult, an object of Promise
    will pass to your parent function. Read mongoose API for query such as findOne() before
    starts.
 */
async function findByName(username) {
    try {
        let result = await userModel.findOne({username: username}).exec();
        if (result == null) {
            console.log("unable to find user by username: " + username);
        }
        return result;
    } catch (err) {
        return null;
    }
}

async function findById(accountId) {
    try {
        let result = await userModel.findOne({accountId: accountId}).exec();
        if (result == null) {
            console.log("unable to find user by accountId: " + accountId);
        }
        return result;
    } catch (err) {
        return null;
    }
}

async function loginById(accountId, password) {
    try {
        let result = await userModel.findOne(
            {accountId: accountId, password:password}
            ).exec();
        if (result == null) {
            console.log("unable to login user by accountId: " + accountId);
        }
        return result;
    } catch (err) {
        return null;
    }
}

async function loginByName(username, password) {
    try {
        let result = await userModel.findOne(
            {username:username, password:password}
        ).exec();
        if (result == null) {
            console.log("unable to login user by username: " + username);
        }
        return result;
    } catch (err) {
        return null;
    }
}


async function register(username, password, accountId) {
    try {
        const newUser = new userModel({
            username: username,
            password: password,
            accountId: accountId
        });
        let saveUser = await newUser.save().exec(); //when fail its goes to catch
        console.log(saveUser); //when success it print.
        return true;
    } catch (err) {
        return false;
    }
}

async function setEmail(accountId, email) {}
async function setGender(accountId, email) {}


//TODO: create more async function to help implement functions in user.service.js
/*
    user.entity.js directly communicates with the db
    consider Java, you take in a string and then return the result
    do not pass the entire Json request body (req.body) into entity layer
    design your function using only the parameters you need to work with db
    each function should only complete one task, for example:

    if user.service.js wants to register a new user, it needs to call:
           userFactory.findByID (? already exist)
           userFactory.findByName (?already exist)
           return if already exist and notify caller the correct status
           if not:
                userFactory.create(username, password, accountID ....)
                again do not pass in Json!!!
 */

