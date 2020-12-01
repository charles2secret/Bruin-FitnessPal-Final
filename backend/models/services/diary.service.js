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
/*
service.putFoodRecord = putFoodRecord;
service.putHealthRecord = putHealthRecord;

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

/*TODO
    record is a JSON, other field should align with the db
    use Transaction single we are dealing with multiple access to db
    1. check if a diary of specific date is in db,
    2. if not, create one
    3. put an activity into that diary

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

