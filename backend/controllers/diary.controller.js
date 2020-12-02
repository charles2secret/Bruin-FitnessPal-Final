const diaryService = require('../models/services/diary.service')
const router = require('express-promise-router')();

// routes:
router.get('/health', getHealthRecord);
router.get('/activity', getActivityRecord);
router.get('/diet', getFoodRecord);
router.put('/health', putHealthRecord);
router.put('/activity', putActivityRecord);
router.put('/food/put', putFoodRecord);
router.delete('/health', deleteHealthRecord);
router.delete('/activity', deleteActivityRecord);
router.delete('/food', deleteFoodRecord);

module.exports = router;

//TODO: do this two first

async function putHealthRecord(req, res) {
}

async function putFoodRecord(req, res) {
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
    //.......
}


async function getHealthRecord(req, res) {

    //.......
}


async function getFoodRecord(req, res) {
    //.......
}


async function deleteHealthRecord(req, res) {

}

async function deleteActivityRecord(req, res) {

}

async function deleteFoodRecord(req, res) {


}

async function newDiary(req, res) {
    try {
        response = await diaryService.createNewDiary(req.body);
        if (response === "success") {
            res.send({
                status: "X103"
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
