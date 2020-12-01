const diaryFactory = require('../entities/diary.entity')

const config = require('./config.json');
const mongo = require('mongoose');

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

/* TODO
    1. get an instance of db connection
        (since db connection is established in user.service already)
    2.
 */

var service = {};

service.createNewDiary = createNewDiary;

service.getActivityRecord = getActivityRecord;
service.getFoodRecord = getFoodRecord;
service.getHealthRecord = getHealthRecord;

service.putActivityRecord = putActivityRecord;

service.putFoodRecord = putFoodRecord;
service.putHealthRecord = putHealthRecord;

/*

service.deleteActivityRecord =deleteActivityRecord;
service.deleteFoodRecord = deleteFoodRecord;
service.deleteHealthRecord = deleteHealthRecord;

 */

module.exports = service;


//TODO: feel free to change function name....
async function createNewDiary(userParam) {
    try {
        let diary = diaryFactory.createDiary(userParam.accountId);
        if (diary){
            return "success";
        } 
        return "failed";
    } catch (err){
        return err;
    }

    /*
        if diary exists, return some kind of error
        if doesn't, call functions in diary.entity.js
     */
}

//TODO: finish setter first.....
async function getActivityRecord() {}
async function getFoodRecord() {}
async function getHealthRecord() {}



/**
 * record diet, if diary does not exist, create one
 *
 * @param {JSON} RecordParam
 * @return {String} a message to diary.controller.js
 */
async function putFoodRecord(RecordParam) {
    /*
       TODO:
        1. check if food diary exist by calling
            diaryFactory.containFoodDiary(....)
        2. if not
            diaryFactory.createFoodDiary(....)
        3. then add food log
            diaryFactory.putFoodRecord(id, date, food)
        food should be JSON
     */
}


async function putHealthRecord(RecordParam) {
    /*
       TODO:
        1. check what health record we need to put
            e.g. RecordParam {
                weightDiary ....
            }
        in this case, only weight diary needs to be updated
        2. before update check if the specific diary exists or not
        //..same as step 1 and 2 in putFoodRecord
        3. add diary
            diaryFactory.putWeightDiary(xxxx)

       TODO:
        note:
        weightDiary: override old weight if exists
        waterDiary: add the input value to waterDiary.dailyWaterConsumed
        sleep: override old sleep time if exists
     */
}


//TODO: =========== below are finished functions ====================

/**
 * record activity, if diary does not exist, create one
 *
 * @param {JSON} RecordParam
 * @return {String} a message to diary.controller.js
 */
async function putActivityRecord(RecordParam) {
    const session = await mongo.startSession();
    try {
        session.startTransaction();
        let id = RecordParam.accountId;
        let date = RecordParam.date;
        let activity = RecordParam.activity;
        console.log(date);
        let status = await diaryFactory.containActivityDiary(id, date);
        if (!status) {
            let result = await diaryFactory.createActivityDiary(id, date);
            if (!result) {
                throw new Error("diary doesn't exist but failed during creation");
            }
        }
        let result = await diaryFactory.putActivityRecord(id, date, activity);
        if (!result) {
            throw new Error("activity diary found but failed to insert new activity");
        }
        await session.commitTransaction()
        session.endSession()
        return "Activity Successfully Logged";
    } catch(err) {
        await session.abortTransaction()
        session.endSession()
        return err;
    }
}

