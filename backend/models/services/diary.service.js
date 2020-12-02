const diaryFactory = require('../entities/diary.entity')
const util = require('../entities/utilFunc')
const config = require('./config.json');
const mongo = require('mongoose');

const db = mongo.connect(config.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
}).then(
    () => {console.log("MongoDB Running at diary.service.js")},
    err => {console.log("DB Connection Failed")}
);

/* TODO
    1. get an instance of db connection
        (since db connection is established in user.service already)
    2.
 */

var service = {};
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


//TODO: finish setter first.....
async function getFoodRecord() {}
async function getHealthRecord() {}
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
 * return an activity diary by date to controller
 *
 * @param {JSON} RecordParam
 * @return {JSON} activity diary is null if not found
 */
async function getActivityRecord(RecordParam) {
    try {
        let id = RecordParam.accountId;
        let date = RecordParam.date;
        let status = await diaryFactory.containActivityDiary(id, date);
        if(!status) {
            console.log("no diary is found, return null");
            return null;
        }
        let diaries = await diaryFactory.getActivityDiary(id, date);
        if (diaries.length === 0) {
            console.log("diary is found, but no activity recorded yet");
            return null;
        }
        return diaries;
    } catch (err) {
        util.HandleError(err,"diary.service.js", "getActivityRecord");
        return null;
    }
}


/**
 * record activity, if diary does not exist, create one
 *
 * @param {JSON} RecordParam
 * @return {String} a message to diary.controller.js
 */
async function putActivityRecord(RecordParam) {
    try {
        let id = RecordParam.accountId;
        let date = RecordParam.date;
        let activity = RecordParam.activity;
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
        return "Activity Successfully Logged";
    } catch(err) {
        util.HandleError(err,"diary.service.js","putActivityRecord");
        return err;
    }
}

