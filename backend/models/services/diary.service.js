const diaryFactory = require('../entities/diary.entity')
const mongo = require('mongoose');

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
module.exports = service;


//TODO: feel free to change function name....
//      don't forget to use async
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

//TODO: same as before, they accept input as req.body
//      which has: String date, and others...
//      get record of a given date
async function getActivityRecord() {}
async function getFoodRecord() {}
//TODO: given a specific date, this should return an object including:
//      water log, weight log, sleep log
async function getHealthRecord() {
    /*
        water = diary.entity.js.getWaterRecord(Date)
        weight...
        sleep...

        //HealthRecord should be JSON
        HealthRecord = {some processing to put things together}

        if (err)
            ...
        else
            return HealthRecord
     */
}
