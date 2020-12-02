const mongoose = require('mongoose');
const util = require('./utilFunc.js');
const Schema = mongoose.Schema;

var diaryFactory = {}
diaryFactory.createDiary = createDiary;
diaryFactory.containActivityDiary = containActivityDiary;
diaryFactory.createActivityDiary = createActivityDiary;
diaryFactory.putActivityRecord = putActivityRecord;
diaryFactory.getActivityDiary = getActivityDiary;
module.exports = diaryFactory;

const foodSchema = new Schema({
    foodName: {type: String, required: true},
    calorieConsumed : {default: -1, type: Number},
    timeOfDay: {
        type: String,
        required: true,
        num:["breakfast",
            "lunch",
            "dinner",
            "snack"]},
    totalFat: {type: Number, default: -1},
    totalProtein: {type: Number, default: -1},
    totalCarbs: {type: Number, default: -1},
    totalSodium: {type: Number, default: -1},
    totalFiber: {type: Number, default: -1}
});

const foodDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyCalorieConsumed: {default: 0, type: Number},
    food: [foodSchema]
});

const activitySchema = new Schema({
    activityName: {type: String, require: true},
    activityType: {
        type: String,
        require:true,
        enum: ["cardio", "weight-training"]
    },
    calorieBurned: {type: Number, require: true},
    duration: {type: Number, required: true}, //in minutes
    timeOfDay: {
        type: String,
        //required: true, //TODO: check with frontend
        num:["morning",
            "noon",
            "afternoon",
            "evening"]},
});

const activityDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyCalorieBurned: {default: 0, type: Number},
    activity: [activitySchema]
});


const waterDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyWaterConsumed: {default: 0, type: Number}
});


const weightDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    weight: {type: String, default: "no record for today"}
});


const sleepDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    sleepTime: {type: Number, default: 540}
});

const diarySchema = new Schema ({
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
    foodDiary: [foodDiarySchema],
    activityDiary: [activityDiarySchema],
    waterDiary: [waterDiarySchema],
    weightDiary: [weightDiarySchema],
    sleepDiary: [sleepDiarySchema]
});

const diaryModel = mongoose.model('Diary',diarySchema);


//TODO: CRUD for food diary
function containFoodDiary(accountId, date) {}
function createFoodDiary(accountId, date) {}
function getFoodDiary(accountId, date) {}
function putFoodRecord(accountId, date, food) {}

//TODO: CRUD for sleep diary
//  once this is done, the last two are just copy&paste work
//  putSleep and putWeight override old value
//  putWater adds to water consumption
function containSleepDiary(accountId, date) {}
function createSleepDiary(accountId, date) {}
function getSleepDiary(accountId, date) {}
function putSleepRecord(accountId, date) {}

//TODO: CRUD for weight diary
function containWeightDiary(accountId, date) {}
function createWeightDiary(accountId, date) {}
function getWeightDiary(accountId, date) {}
function putWeightRecord(accountId, date) {}

//TODO: CRUD for water diary
function containWaterDiary(accountId, date) {}
function createWaterDiary(accountId, date) {}
function getWaterDiary(accountId, date) {}
function putWaterRecord(accountId, date) {}


//TODO: =========== below are finished functions ====================


/**
 * create a diary by accountId
 *
 * @param {String} accountId
 * @return {Boolean} status of creation
 */
async function createDiary(accountId) {
    try{
        const newDiary = new diaryModel({accountId: accountId});
        let userDiary = await newDiary.save();
        if (userDiary == null){
            console.log("unable to create Diary for user: ", accountId);
            return false;
        }
        return true;
    } catch(err){
        util.HandleError(err, "diary.entity.js", "createDiary","accountId: " + accountId);
        return false;
    }
}


/**
 * get activity record by date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {JSON} diary is null if not found
 */
async function getActivityDiary(accountId, date){
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let diaries =  response.activityDiary;
        for (let i=0; i<diaries.length; i++) {
            if (diaries[i].date === date) {
                return diaries[i];
            }
        }
        return null;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "getActivityDiary");
        return null;
    }
}


/**
 * check if a diary is exist for date: date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} whether a diary exists
 */
async function containActivityDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let activityDiary = response.activityDiary;
        for (let i=0; i<activityDiary.length; i++) {
            if (activityDiary[i].date === date) {
                return true;
            }
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "containActivityDiary");
        return false;
    }
}


/**
 * create a new diary by date, this should not be invoked
 * without prior calling to containActivityDiary
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} successful creation of diary or not
 */
async function createActivityDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        response.activityDiary.push({date: date});
        await response.save();
        return true;
    } catch (err) {
        util.HandleError(err, "diary.entity.js","createActivityDiary");
        return false;
    }
}


/**
 * put an activity into specific diary
 * this should not be invoked alone, see functions above
 * @param {String} accountId
 * @param {String} date
 * @param {JSON} activity
 * @return {Boolean} successful creation of diary or not
 */
async function putActivityRecord(accountId, date, activity) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        for (let i=0; i<response.activityDiary.length; i++) {
            if (response.activityDiary[i].date === date) {
                response.activityDiary[i].activity.push(activity);
                response.activityDiary[i].dailyCalorieBurned +=
                    activity.calorieBurned;
                let status = await response.save();
                return true;
            }
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "putActivityRecord");
        return false;
    }
}



