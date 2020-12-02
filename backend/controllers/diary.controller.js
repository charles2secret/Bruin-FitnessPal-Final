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

async function putHealthRecord(req, res) {
    try {
        let response = await diaryService.putHealthRecord(req.body);
        if (response === "Health Successfully Logged") {
            res.send({
                status: "X103",
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

async function getHealthRecord(req, res) {
    try {
        let HealthRecord = await diaryService.getHealthRecord(req.body);
        if (HealthRecord) {
            res.send({
                status: "X111",
                HealthDiary: HealthRecord
            })
        } else {
            res.send({
                status: "X001",
                message: "the given date doesn't have any health record yet"
            })
        }

    } catch (err) {
        res.send({
            status: "X001",
            message: err
        })
    }
}


async function putFoodRecord(req, res) {
    try {
        let response = await diaryService.putFoodRecord(req.body);
        if (response === "Food Successfully Logged") {
            res.send({
                status: "X103", 
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

async function getFoodRecord(req, res) {
    try {
        let foodDiary = await diaryService.getFoodRecord(req.body);
        if (foodDiary) {
            res.send({
                status: "X111",
                foodDiary: foodDiary
            })
        } else {
            res.send({
                status: "X001",
                message: "the given date doesn't have any food diary yet"
            })
        }

    } catch (err) {
        res.send({
            status: "X001",
            message: err
        })
    }
}

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

