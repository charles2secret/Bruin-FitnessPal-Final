const diaryService = require('../models/services/diary.service')
const router = require('express-promise-router')();

// routes:
//TODO: post = get, because I did not figure out
//      how to send json while using httpClient.get
//      so to make life eaiser... use post....
router.post('/health', getHealthRecord);
router.post('/activity', getActivityRecord);
router.post('/diet', getFoodRecord);
router.put('/health', putHealthRecord);
router.put('/activity', putActivityRecord);
router.put('/food/put', putFoodRecord);
/*
router.delete('/health', deleteHealthRecord);
router.delete('/activity', deleteActivityRecord);
router.delete('/food', deleteFoodRecord);


 */
module.exports = router;

//TODO: finish as much as you can
async function putHealthRecord(req, res) {}
async function putFoodRecord(req, res) {}
async function getFoodRecord(req, res) {}
async function getHealthRecord(req, res) {}


//TODO: ==================== finished functions below ====================
async function putActivityRecord(req, res) {
    try {
        let response = await diaryService.putActivityRecord(req.body);
        if (response === "Activity Successfully Logged") {
            res.send({
                status: "X103", //PUT = 3
                message: response
            })
        } else {
            res.send({
                status: "X003",
                message: response
            })
        }
    } catch (err) {
        res.send({
            status: "X003",
            message: err
        })
    }
}


async function getActivityRecord(req, res) {
    try {
        let activityRecord = await diaryService.getActivityRecord(req.body);
        if (activityRecord) {
            res.send({
                status: "X111",
                activityDiary: activityRecord
            })
        } else {
            res.send({
                status: "X001",
                message: "the given date doesn't have any diary yet"
            })
        }

    } catch (err) {
        res.send({
            status: "X001",
            message: err
        })
    }
}

