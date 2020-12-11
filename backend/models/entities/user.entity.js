const mongoose = require('mongoose');
const util = require('./utilFunc.js');
const Schema = mongoose.Schema;

var userFactory = {}
userFactory.findByName = findByName;
userFactory.findById = findById;
userFactory.register = register;
userFactory.loginByName = loginByName;
userFactory.loginById = loginById;

userFactory.setEmail = setEmail;
userFactory.setGender = setGender;
userFactory.setPhone = setPhone;
userFactory.setAddress = setAddress;
userFactory.setBirth = setBirth;
userFactory.setUsername = setUsername;
userFactory.setPassword = setPassword;

userFactory.getEmail = getEmail;
userFactory.getGender = getGender;
userFactory.getPhone = getPhone;
userFactory.getAddress = getAddress;
userFactory.getBirth = getBirth;
userFactory.getUserById = getUserById;
userFactory.getUserByName = getUserByName;

userFactory.getFriend = getFriend;
userFactory.checkFriend = checkFriend;
userFactory.deleteFriend = deleteFriend;
userFactory.addFriend = addFriend;

userFactory.delByID = delByID;

userFactory.updatePlan = updatePlan;
userFactory.getPlan = getPlan;
userFactory.deleteActivity = deleteActivity;
module.exports = userFactory;

const friendSchema = new Schema ({
    friendId: { type: String,
                minlength: 6,
                maxlength: 20,
                trim: true,
                required: true,
                lowercase: true
    }
});

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
    },
    friendList: [friendSchema],
    workoutPlan: [{
        time: {type: String},
        activity: {type: String}
    }]
});
const userModel = mongoose.model('User', userSchema);

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
        util.HandleError(err, "user.entity.js", "findByName", "username: "+username);
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
        util.HandleError(err, "user.entity.js", "findById", "accountId: "+ accountId);
        return null;
    }
}


/**
 *  logs in user by accountId
 *
 * @param {String} accountId
 * @param {String}password
 * @return {boolean} whether login is successful or not
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
        util.HandleError(err, "user.entity.js", "loginById", "accountId: "+ accountId);
        return false;
    }
}


/**
 *  logs in user by username
 *
 * @param {String} username
 * @param {String}password
 * @return {boolean} whether login is successful or not
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
        util.HandleError(err, "user.entity.js", "loginByName", "username: " + username);
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
 */
async function register(username, password, accountId) {
    try {
        const newUser = new userModel({
            username: username,
            password: password,
            accountId: accountId,
            friendList: [{
                friendId: "BFP-STAFF"
            }]
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
        util.HandleError(err, "user.entity.js", "register","username: " + username +
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
        util.HandleError(err, "user.entity.js", "setEmail", "accountId: " + accountId +
            "email: " + email);
        return false;
    }
}


/**
*  setGender with 2 inputs
*  
*  @param {String} accountId
*  @param {String} gender
*
*  @return {boolean} whether setGender is successful or not
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
        util.HandleError(err, "user.entity.js", "setGender", "accountId: " + accountId +
            "gender: " + gender);
        return false;
    }
}


/**
 *  setUsername with 2 inputs
 *
 *  @param {String} accountId
 *  @param {String} username
 *
 *  @return {boolean} whether setUsername is successful or not
 */
async function setUsername(accountId, username) {
    try {
        if (username==null || accountId==null){
            console.log("cannot set username to null or accountId is not given");
            return;
        }
        const filter = {accountId: accountId};
        const update = {username:username};
        const options = {runValidators: true, upsert: true};
        let user = await userModel.updateOne(filter, {$set: update}, options);
        if (user == null){
            console.log("unable to find id and username combination");
            return false;
        } else {
            console.log("set username to " + username);
            return true;
        }
    } catch(err) {
        util.HandleError(err, "user.entity.js", "setUsername", "accountId: " + accountId +
            "username: " + username);
        return false;
    }
}


/**
 *  setPassword with 2 inputs
 *
 *  @param {String} accountId
 *  @param {String} password
 *
 *  @return {boolean} whether setPassword is successful or not
 */
async function setPassword(accountId, password) {
    try {
        if (password==null || accountId==null){
            console.log("cannot set password to null or accountId is not given");
            return;
        }
        const filter = {accountId: accountId};
        const update = {password:password};
        const options = {runValidators: true, upsert: true};
        let user = await userModel.updateOne(filter, {$set: update}, options);
        if (user == null){
            console.log("unable to find password and username combination");
            return false;
        } else {
            console.log("set password to " + password);
            return true;
        }
    } catch(err) {
        util.HandleError(err, "user.entity.js", "setPassword", "accountId: " + accountId +
            "password: " + password);
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
        util.HandleError(err, "user.entity.js", "setPhone", "accountId: " + accountId +
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
        util.HandleError(err, "user.entity.js", "setAddress", "accountId: " + accountId +
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
        util.HandleError(err, "user.entity.js", "setBirth", "accountId: " + accountId +
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
        util.HandleError(err, "user.entity.js", "getEmail", "accountId: "+accountId);
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
        util.HandleError(err, "user.entity.js", "getGender", "accountId: "+accountId);
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
        util.HandleError(err, "user.entity.js", "getPhone", "accountId: "+accountId);
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
        util.HandleError(err, "user.entity.js", "getAddress", "accountId: "+accountId);
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
        util.HandleError(err, "user.entity.js", "getBirth", "accountId: "+accountId);
        return null;
    }
}

/**
 *  getUserById with 1 input
 *
 *  @param {String} accountId
 *
 *  @return {object}
 */
async function getUserById(accountId){
    try {
        let user = await userModel.findOne({accountId: accountId});
        if (user == null) {
            console.log("unable to find user by accountId: " + accountId);
            return user;
        }
        console.log("successfully find user by accountId: " + accountId);
        return user;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "getUserById", "accountId: "+accountId);
        return null;
    }
}


/**
 *  getUserById with 1 input
 *
 *  @param {String} username
 *
 *  @return {object}
 */
async function getUserByName(username){
    try {
        let user = await userModel.findOne({username:username});
        if (user == null) {
            console.log("unable to find user by username: " + username);
            return user;
        }
        console.log("successfully find user by username: " + username);
        return user;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "getUserByName", "username "+ username);
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
        util.HandleError(err, "user.entity.js", "deleteByName", "accountId: "+accountId);
        return false;
    }
}

async function getFriend(accountId) {
    try {
        let user = await userModel.findOne({accountId: accountId});
        if (user == null) {
            console.log("user " + accountId + " for getFriend doesn't exist");
            return null;
        }
        console.log("friendList is successfully returned for " + accountId + " which might be null");
        return user.friendList;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "getFriend", "accountId: "+accountId);
        return null;
    }
}

async function checkFriend(accountId, friendId) {
    try {
        let user = await userModel.findOne({accountId: accountId});
        if (user == null) {
            console.log("user " + accountId + " for getFriend doesn't exist");
            return false;
        }
        if (user.friendList == null) {
            console.log( "no friend for user + " + accountId + " at checkFriend");
            return true;
        }
        for (let i=0; i<user.friendList.length; i++) {
            if (user.friendList[i].friendId === friendId) {
                console.log("friend " + friendId, " already exist");
                return false;
            }
        }
        console.log("check passed for " + accountId + " , now can add friend!");
        return true;

    } catch (err) {
        util.HandleError(err, "user.entity.js", "checkFriend", "accountId: "+accountId+" friendId " +friendId);
        return null;
    }
}
async function addFriend(accountId, friendId) {
    try {
        let user = await userModel.findOne({accountId: accountId});
        user.friendList.push({friendId: friendId});
        await user.save();
        user = await userModel.findOne({accountId: accountId});
        return user.friendList;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "addFriend", "accountId: "+accountId+" friendId " +friendId);
        return null;
    }
}
async function deleteFriend(accountId, friendId) {
    try {
        let user = await userModel.findOne({accountId: accountId});
        user.friendList = user.friendList.filter(
            x => x.friendId !== friendId
        );
        //user.friendList.pull({friendId: friendId});
        await user.save();
        user = await userModel.findOne({accountId: accountId});
        return user.friendList;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "deleteFriend", "accountId: "+accountId+" friendId " +friendId);
        return null;
    }
}

async function getPlan(accountId) {
    try {
        let user = await userModel.findOne({accountId: accountId});
        if (user) {
            console.log("user found, returning workoutPlan");
            return user.workoutPlan;
        }
        console.log("user not found for getPlan, please debug");
        return null;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "getPlan", "accountId: "+accountId+" friendId " +friendId);
        return null;
    }

}

async function updatePlan(accountId, workoutPlan) {
    try {
        let user = await userModel.findOne({accountId: accountId});
        user.workoutPlan = workoutPlan;
        await user.save();
        user = await userModel.findOne({accountId: accountId});
        return user.workoutPlan;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "updatePlan", "accountId: "+accountId+" friendId " +friendId);
        return null;
    }
}

async function deleteActivity(accountId, activity) {
    try {
        let user = await userModel.findOne({accountId: accountId});
        let userPlan = user.workoutPlan;
        for (let i=0; i<userPlan.length; i++) {
            if (userPlan[i].time === activity.time) {
                userPlan.splice(i,1);
                break;
            }
        }
        await user.save();
        user = await userModel.findOne({accountId: accountId});
        return user.workoutPlan;
    } catch (err) {
        util.HandleError(err, "user.entity.js", "deletePlan", "accountId: "+accountId+" friendId " +friendId);
        return null;
    }
}

