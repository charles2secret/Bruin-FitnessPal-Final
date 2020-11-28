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
userFactory.setPhone = setPhone;
userFactory.setAddress = setAddress;
userFactory.setBirth = setBirth;

userFactory.getEmail = getEmail;
userFactory.getGender = getGender;
userFactory.getPhone = getPhone;
userFactory.getAddress = getAddress;
userFactory.getBirth = getBirth;

userFactory.delByID = delByID;

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
*  @param {String} email
*
*  @return {boolean} whether setEmail is successful or not
*    * no user instace  is returned under any circumstance *
*/
async function setEmail(accountId, email) {
    try {
        if (email==null || accountId==null){
            console.log("cannot set email to null; please provide a valid email");
            return;
        }
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

/**
*  setEmail with 2 inputs
*  
*  @param {String} accountId
*  @param {String} gender
*
*  @return {boolean} whether setGender is successful or not
*    * no user instace  is returned under any circumstance *
*/
async function setGender(accountId, gender) {
    try {
        if (gender==null || accountId==null){
            console.log("cannot set gender to null; please provide a valid gender");
            return;
        }
        const filter = {accountId: accountId};
        const update = {gender: gender};
        const options = {runValidators: true, upsert: true};
        let user = await userModel.updateOne(filter, {$set: update}, options);
        if (user == null){
            console.log("unable to find user with such accountId; failed to set gender");
            return false;
        } else {
            console.log("set gender to " + gender);
            return true;
        }
    } catch(err) {
        HandleError(err, "setGender", "accountId: " + accountId +
            "gender: " + gender);
        return false;
    }
}

/**
*  setPhone with 2 inputs
*  
*  @param {String} accountId
*  @param {String} phone
*
*  @return {boolean} whether setPhone is successful or not
*    * no user instace is returned under any circumstance *
*/
async function setPhone(accountId, phone){
    try {
        if (phone==null || accountId==null){
            console.log("cannot set phone to null; please provide a valid phone");
            return;
        }
        const filter = {accountId: accountId};
        const update = {'contact.phone': phone};
        const options = {runValidators: true, upsert: true};
        let user = await userModel.updateOne(filter, {$set: update}, options);
        if (user == null){
            console.log("unable to find user with such accountId; failed to set phone");
            return false;
        } else {
            console.log("set phone to " + phone);
            return true;
        }
    } catch(err) {
        HandleError(err, "setPhone", "accountId: " + accountId +
            "phone: " + phone);
        return false;
    }
}

/**
*  setAddress with 2 inputs
*  
*  @param {String} accountId
*  @param {String} address
*
*  @return {boolean} whether setAddress is successful or not
*    * no user instace is returned under any circumstance *
*/
async function setAddress(accountId, address){
    try {
        if (address==null || accountId==null){
            console.log("cannot set address to null; please provide a valid address");
            return;
        }
        const filter = {accountId: accountId};
        const update = {'contact.address': address};
        const options = {runValidators: true, upsert: true};
        let user = await userModel.updateOne(filter, {$set: update}, options);
        if (user == null){
            console.log("unable to find user with such accountId; failed to set address");
            return false;
        } else {
            console.log("set address to " + address);
            return true;
        }
    } catch(err) {
        HandleError(err, "setAddress", "accountId: " + accountId +
            "address: " + address);
        return false;
    }

}

/**
*  setBirth with 2 inputs
*  
*  @param {String} accountId
*  @param {String} birth
*
*  @return {boolean} whether setBirth is successful or not
*    * no user instace is returned under any circumstance *
*/
async function setBirth(accountId, birth){
    try {
        if (birth==null || accountId==null){
            console.log("birth input is empty or id input is empty");
            return;
        }
        const filter = {accountId: accountId};
        const options = {runValidators: true, upsert: true};
        var update = {};
        if (birth.day) update['birth.day'] = birth.day;
        if (birth.month) update['birth.month'] = birth.month;
        if (birth.year) update['birth.year'] = birth.year;

        let user = await userModel.updateOne(filter, {$set: update}, options);
        if (user == null){
            console.log("unable to find user with such accountId; failed to set birth");
            return false;
        } else {
            console.log("set birth to " + birth);
            return true;
        }
    } catch(err) {
        HandleError(err, "setBirth", "accountId: " + accountId +
            "birth: " + birth);
        return false;
    }
}

/**
*  getEmail with 1 input
*  
*  @param {String} accountId
*
*  @return {Dictionary} {contact: { email : EMAIL}} email if query userModel by accountId is successful
*    return null if query is unsuccessful or field is not filled/ DNE for userModel
*/
async function getEmail(accountId){
    try {
        let user = await userModel.findOne({accountId: accountId},  'contact.email -_id');
        if (user == null) {
            console.log("unable to find user by accountId: " + accountId);
            return user;
        }
        console.log("successfully find user by accountId: " + accountId);
        return user;
    } catch (err) {
        HandleError(err, "getEmail", "accountId: "+accountId);
        return null;
    }
}

/**
*  getGender with 1 input
*  
*  @param {String} accountId
*
*  @return {set} gender: GENDER if query userModel by accountId is successful
*    return null if query is unsuccessful or field is not filled/ DNE for userModel
*/
async function getGender(accountId) {
    try {
        let user = await userModel.findOne({accountId: accountId},  'gender -_id');
        if (user == null) {
            console.log("unable to find user by accountId: " + accountId);
            return user;
        }
        console.log("successfully find user by accountId: " + accountId);
        return user;
    } catch (err) {
        HandleError(err, "getGender", "accountId: "+accountId);
        return null;
    }
}

/**
*  getPhone with 1 input
*  
*  @param {String} accountId
*
*  @return {Dictionary} {contact: {phone: PHONE}} if query userModel by accountId is successful
*    return null if query is unsuccessful or field is not filled/ DNE for userModel
*/
async function getPhone(accountId){
    try {
        let user = await userModel.findOne({accountId: accountId},  'contact.phone -_id');
        if (user == null) {
            console.log("unable to find user by accountId: " + accountId);
            return user;
        }
        console.log("successfully find user by accountId: " + accountId);
        return user;
    } catch (err) {
        HandleError(err, "getPhone", "accountId: "+accountId);
        return null;
    }
}

/**
*  getAddress with 1 input
*  
*  @param {String} accountId
*
*  @return {Dictionary} {contact: {address: ADDRESS }} if query userModel by accountId is successful
*    return null if query is unsuccessful or field is not filled/ DNE for userModel
*/
async function getAddress(accountId){
    try {
        let user = await userModel.findOne({accountId: accountId},  'contact.address -_id');
        if (user == null) {
            console.log("unable to find user by accountId: " + accountId);
            return user;
        }
        console.log("successfully find user by accountId: " + accountId);
        return user;
    } catch (err) {
        HandleError(err, "getAddress", "accountId: "+accountId);
        return null;
    }
}

/**
*  getBirth with 1 input
*  
*  @param {String} accountId
*
*  @return {dictionary} {birth: {year: YEAR, month: MONTH, day: DAY}} if query userModel by accountId is successful
*    return null if query is unsuccessful or field is not filled/ DNE for userModel
*/
async function getBirth(accountId){
    try {
        let user = await userModel.findOne({accountId: accountId},  'birth -_id');
        if (user == null) {
            console.log("unable to find user by accountId: " + accountId);
            return user;
        }
        console.log("successfully find user by accountId: " + accountId);
        return user;
    } catch (err) {
        HandleError(err, "getAddress", "accountId: "+accountId);
        return null;
    }
}

/**
*  deleteByName with 1 input
*  
*  @param {String} accountId
*
*  @return {boolean} if delete userModel by accountId is successful
*    return null if query is unsuccessful 
*/
async function delByID(accountId){
    try {
        let user = await userModel.findOneAndDelete({accountId: accountId});
        if (user == null) {
            console.log("unable to delete user by accountId: " + accountId);
            return false;
        }
        console.log("successfully delete user by accountId: " + accountId);
        return true;
    } catch (err) {
        HandleError(err, "deleteByName", "accountId: "+accountId);
        return false;
    }
    return false;
}


