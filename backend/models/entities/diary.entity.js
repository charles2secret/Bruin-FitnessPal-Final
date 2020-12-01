const mongoose = require('mongoose');
const util = require('./utilFunc.js');
const Schema = mongoose.Schema;

//TODO: make sure add to export module after writing your function
//      and check comment below before start
// userDiary.save()
// ref:
// https://mongoosejs.com/docs/subdocs.html

/* TODO:
    general design pattern:
    (if your design is faster, let me know)
    1. dairies (with unique id)  has arrays of foodDiaries
    2. -> foodDiaries (with unique date) has arrays of food
    3. -> food (single food) with calorie, timeOfDay, etc
 */
var diaryFactory = {}
diaryFactory.createDiary = createDiary;
diaryFactory.containActivityDiary = containActivityDiary;
diaryFactory.createActivityDiary = createActivityDiary;
diaryFactory.putActivityRecord = putActivityRecord;

//add export functions here....
module.exports = diaryFactory;

const foodSchema = new Schema({
    foodName: {type: String, required: true},
    calorieConsumed : {default: -1, type: Number},
    timeOfDay: {
        type: String,
        required: true,
        num:["breakfast",
            "morning snack",
            "lunch",
            "afternoon snack",
            "dinner",
            "after dinner"]},
    totalFat: {type: Number, default: -1},
    totalProtein: {type: Number, default: -1},
    totalCarbs: {type: Number, default: -1},
    totalSodium: {type: Number, default: -1},
    totalFiber: {type: Number, default: -1}
});

const foodDiarySchema = new Schema({
    date: {
        // unique: true,
        // required: true, 
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
            "afternoon snack",
            "dinner",
            "after dinner"]},
});

const activityDiarySchema = new Schema({
    date: {
        // unique: true,
        // required: true, 
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyCalorieConsumed: {default: 0, type: Number},
    activity: [activitySchema]
});


const waterDiarySchema = new Schema({
    date: {
        // unique: true,
        // required: true, 
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyWaterConsumed: {default: 0, type: Number}
});

//TODO: weight is string because I don't want to deal with
//      type conversion (kg/lbs) and days without record
const weightDiarySchema = new Schema({
    date: {
        // unique: true,
        // required: true, 
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    weight: {type: String, default: "no record for today"}
});

//TODO: sleepTime is in minutes, 540min = 9hrs
const sleepDiarySchema = new Schema({
    date: {
        // unique: true,
        // required: true, 
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
    weightDairy: [weightDiarySchema],
    sleepDiary: [sleepDiarySchema]
});

const diaryModel = mongoose.model('Dairy',diarySchema);

/*
    TODO:simple function, not done yet
     please register a newUser and check mongo atlas
     to see how my dataSchema works
 */
async function createDiary(accountId) {
    try{
        const newDiary = new diaryModel({
            accountId: accountId,
            activityDiary:[{
               date: "1998-02-02",
               activity: [{
                   activityName: "running!",
                   activityType: "cardio",
                   calorieBurned: 300,
                   duration: 60
            }]
            }]
        });
        let userDiary = await newDiary.save();
        if (userDiary==null){
            console.log("unable to create Diary for user: ", userDiary);
            return false;
        }
        return true;
    } catch(err){
        util.HandleError(err, "diary.entity.js", "createDiary","accountId: " + accountId);
        return false;
    }
}

/*TODO:
    we don't need to have delete feature unless frontend has such feature
    create simply creates an empty diary at a given date
    recordXXXX will:
        1. if date not given, first create a diary
        2. if date is given, record it to that diary
    3. add them to diaryFactory and exports
 */

//setters:
function createFoodDiary(accountId, date){}
function recordFood(accountId, date, food){}
function recordActivity(accountId, date, food){}
function createWaterDiary(accountId, date){}
function recordWater(accountId, date, food){}
function createWeightDiary(accountId, date){}
function recordWeight(accountId, date, food){}
function createSleepDiary(accountId, date){}
function recordSleep(accountId, date, food){}

//setter
function getFoodRecord(accountId, date){}
function getActivityRecord(accountId, date){}
function getWaterRecord(accountId, date){}
function getWeightRecord(accountId, date){}
function getSleepRecord(accountId, date){}

function findDiary(accountId) {}


//TODO: =========== below are finished functions ====================


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
        util.HandleError(err);
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
        util.HandleError(err);
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
                response.activityDiary[i].dailyCalorieConsumed +=
                    activity.calorieBurned;
                let status = await response.save();
                return true;
            }
        }
        return false;
    } catch (err) {
        util.HandleError(err);
        return false;
    }
}



