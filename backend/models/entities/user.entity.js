const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: make sure add to export module after writing your function
//      and check comment below before start
var userFactory = {}
userFactory.findByName = findByName;
userFactory.findById = findById;
userFactory.register = register;
userFactory.setEmail = setEmail;
userFactory.setGender = setGender;
userFactory.loginByName = loginByName;
userFactory.loginById = loginById;
//add export functions here....
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
            default: "0000000000",
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
});
const userModel = mongoose.model('User', userSchema);

//===================================================================>
/**
 * standard error handler for subsequent functions
 * it prints error message in detail in console
 *
 * @param {Error} err
 * @param {String} function_name of the error happens
 * @param {...string} args
 * @return {userModel} a user instance of userModel
 *      when err or user not found, user = null
 */
function HandleError (err, function_name, ...args) {
    console.log("================user.entity.js================================");
    console.log("internal error at function " + function_name);
    console.log("input param for the error: ");
    for (var i=1; i<args.length; i++) {
        console.log(args[i]);
    }
    console.log("error message: " + err.message);
    console.log("==============================================================")
}

/**
 * finds user in mongodb by username
 *
 * @param {String} username
 * @return {userModel} a user instance of userModel
 *      when err or user not found, user = null
 */
async function findByName(username) {
    try {
        let user = await userModel.findOne({username: username});
        if (user == null) {
            console.log("unable to find user by username: " + username);
            return user;
        }
        console.log("successfully find user by username: " + username);
        return user;
    } catch (err) {
        HandleError(err, "findByName", "username: "+username);
        return null;
    }
}

/**
 * finds user in mongodb by accountId
 *
 * @param {String} accountId
 * @return {userModel} a user instance of userModel
 *      when err or user not found, user = null
 */
async function findById(accountId) {
    try {
        let user = await userModel.findOne({accountId: accountId});
        if (user == null) {
            console.log("unable to find user by accountId: " + accountId);
            return user;
        }
        console.log("successfully find user by accountId: " + accountId);
        return user;
    } catch (err) {
        HandleError(err, "findById", "accountId: "+ accountId);
        return null;
    }
}

/**
 *  logs in user by accountId
 *
 * @param {String} accountId
 * @param {String}password
 * @return {boolean} whether login is successful or not
 *      * no user instance is returned under any circumstance *
 */
async function loginById(accountId, password) {
    try {
        let user = await userModel.findOne(
            {accountId: accountId, password:password});
        if (user == null) {
            console.log("unable to login user by accountId: " + accountId);
            return false;
        }
        console.log("successfully login user by accountId: " + accountId);
        return true;
    } catch (err) {
        HandleError(err, "loginById", "accountId: "+ accountId);
        return false;
    }
}

/**
 *  logs in user by username
 *
 * @param {String} username
 * @param {String}password
 * @return {boolean} whether login is successful or not
 *      * no user instance is returned under any circumstance *
 */
async function loginByName(username, password) {
    try {
        let user = await userModel.findOne(
            {username:username, password:password});
        if (user == null) {
            console.log("unable to login user by username: " + username);
            return false;
        }
        console.log("successfully login user by username: " + username);
        return true;
    } catch (err) {
        HandleError(err, "loginByName", "username: " + username);
        return false;
    }
}

/**
 *  register user with 3 inputs
 *
 * @param {String} username
 * @param {String} password
 * @param {String} accountId
 *
 * @return {boolean} whether login is successful or not
 *      * no user instance is returned under any circumstance *
 */
async function register(username, password, accountId) {
    try {
        const newUser = new userModel({
            username: username,
            password: password,
            accountId: accountId
        });
        let saveUser = await newUser.save(); //when fail its goes to catch
        if (saveUser == null) {
            console.log("unable to register user:");
            console.log(newUser);
            return false;
        }
        console.log("successfully register new user.");
        console.log(newUser);
        return true;
    } catch (err) {
        HandleError(err, "register","username: " + username +
            " password: " + password +
            " id: " + accountId);
        return false;
    }
}

/**
*  setEmail with 2 inputs
*  
*  @param {String} accountId
*  @param {String} enail
*
*  @return {boolean} whether setEmail is successful or not
*    * no user instace  is returned under any circumstance *
*/
async function setEmail(accountId, email) {
    try {
        const filter = {accountId: accountId};
        const update = {'contact.email': email};
        const options = {runValidators: true, upsert: true};
        let user = await userModel.updateOne(filter, {$set: update}, options);
        if (user == null){
            console.log("unable to find user with such accountId; failed to set email");
            return false;
        } else {
            console.log("set email to " + email);
            return true;
        }
    } catch(err) {
        HandleError(err, "setEmail", "accountId: " + accountId +
            "email: " + email);
        return false;
    }
}


//TODO: setter functions, make sure to do DocBlock comment
//      use console.log to log all operations to the database

// will finish all set functions tmr
async function setGender(accountId, gender) {
}

async function setPhone(){
}

async function setAddress(){
}

async function setBirth(){
}

//TODO: create corresponding getter functions, make sure to do DocBlock comment
//      use console.log to log all operations to the database

async function getEmail(accountId, email) {}
async function getUserById(accountId) {}
async function getUserByName(username) {}
async function getGender(accountId, email) {}
async function getPhone(){}
async function getAddress(){}
async function getBirth(){}

/* TODO Notes:
    1. user.entity.js is the direct communication layer for users to the database
    2. do not pass any JSON (req.body) into this layer
    3. write these functions like standard Java setters and getters.
    4. each function should only implement one functionality
    5. example:
        user.service.js has a function registerUser(), and it calls:
            findByID (check if ID already exist)
            findByName (check if name already exist)
            if username and accountId not found:
                   register(user,pass,id,...)
    6. please use async.await in ES6 as oppose to Promise library such as Q
    7. if you are comfortable with Q or writing Promise function by hand, you can
    8. guide to DocBlock comment
    https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8#.w234uo7h3
    10. make sure use try/catch or .then().catch() for error handling, please console.log instead of throw err
        (this helps us to debug each others code)
 */

