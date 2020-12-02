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

/**
 * return a food diary by date to controller
 *
 * @param {JSON} RecordParam
 * @return {JSON} activity diary is null if not found
 */
async function getFoodRecord(RecordParam) {
    try {
        let id = RecordParam.accountId;
        let date = RecordParam.date;
        let status = await diaryFactory.containFoodDiary(id, date);
        if(!status) {
            console.log("no food diary is found, return null");
            return null;
        }
        let diaries = await diaryFactory.getFoodDiary(id, date);
        if (diaries.length === 0) {
            console.log("food diary is found, but no food recorded yet");
            return null;
        }
        return diaries;
    } catch (err) {
        util.HandleError(err,"diary.service.js", "getActivityRecord");
        return null;
    }
}

/**
 * record food, if food diary does not exist, create one
 *
 * @param {JSON} RecordParam
 * @return {String} a message to diary.controller.js
 */
async function putFoodRecord(RecordParam) {
    try{
        let id = RecordParam.accountId;
        let date = RecordParam.date;
        let food = RecordParam.food;
        let status = await diaryFactory.containFoodDiary(id, date);
        if (!status) {
            let result = await diaryFactory.createFoodDiary(id, date);
            if (!result) {
                throw new Error("food diary doesn't exist but failed during creation; accountId might not be in the databse");
            }
        }
        let result = await diaryFactory.putFoodRecord(id, date, food);
        if (!result) {
            throw new Error("food diary found but failed to insert new food");
        }
        return "Food Successfully Logged";
    } catch(err){
        util.HandleError(err,"diary.service.js","putFoodRecord");
        return err;
    }
}

/**
 *
 * @param {JSON} RecordParam
 * @ return a {JSON} of water, weight, and sleep object by date to controller
 *       null if not found
 */
async function getHealthRecord(RecordParam) {
    try {
        let id = RecordParam.accountId;
        let date = RecordParam.date;

        let statusWater = await diaryFactory.containWaterDiary(id, date);
        let statusWeight = await diaryFactory.containWeightDiary(id, date);
        let statusSleep = await diaryFactory.containSleepDiary(id, date);

        if(statusWater == statusWeight && statusWeight == statusSleep && statusSleep == null) {
            console.log("no health diary is found, return null");
            return null;
        }

        let waterDiary = await diaryFactory.getWaterDiary(id, date);
        let weightDiary = await diaryFactory.getWeightDiary(id, date);
        let sleepDiary = await diaryFactory.getSleepDiary(id, date);

        return {waterDiary, weightDiary, sleepDiary};
    } catch (err) {
        util.HandleError(err,"diary.service.js", "getHealthRecord");
        return null;
    }
}


/**
 * record health (water, sleep, and weight);
 *     if any of those diary does not exist, create one
 *
 * @param {JSON} RecordParam
 * @return {String} a message to diary.controller.js
 */
async function putHealthRecord(RecordParam) {
    try{
        let id = RecordParam.accountId;
        let date = RecordParam.date;
        let water = RecordParam.water;
        let sleep = RecordParam.sleep;
        let weight = RecordParam.weight;

        let resultWater = false;
        let resultSleep = false;
        let resultWeight = false;

        if (water!= null){
            let statusWater = await diaryFactory.containWaterDiary(id, date);
            if (!statusWater){
                resultWater = await diaryFactory.createWaterDiary(id, date);
                if (!resultWater) throw new Error("water diary doesn't exist but failed during creation; accountId might not be in the databse");
            }
            resultWater = await diaryFactory.putWaterRecord(id, date, water);
            if (!resultWater) throw new Error("water diary found but failed to insert new water");
        }

        if (sleep!= null){
            let statusSleep = await diaryFactory.containSleepDiary(id, date);
            if (!statusSleep){
                resultSleep = await diaryFactory.createSleepDiary(id, date);
                if (!resultSleep) throw new Error("sleep diary doesn't exist but failed during creation; accountId might not be in the databse");
            }
            resultSleep = await diaryFactory.putSleepRecord(id, date, sleep);
            if (!resultSleep) throw new Error("sleep diary found but failed to insert new sleep");
        }

        if (weight!= null){
            let statusWeight = await diaryFactory.containWeightDiary(id, date);
            if (!statusWeight){
                resultWeight = await diaryFactory.createWeightDiary(id, date);
                if (!resultWeight) throw new Error("weight diary doesn't exist but failed during creation; accountId might not be in the databse");
            }
            resultWeight = await diaryFactory.putWeightRecord(id, date, weight);
            if (!resultWeight) throw new Error("weight diary found but failed to insert new weight");
        }

        const waterPut = (water == null || resultWater);
        const sleepPut = (sleep == null || resultSleep);
        const weightPut = (weight == null || resultWeight);

        if (waterPut && sleepPut && weightPut) return "Health Successfully Logged";
    } catch(err){
        util.HandleError(err,"diary.service.js","putHealthRecord");
        return err;
    }
}

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

