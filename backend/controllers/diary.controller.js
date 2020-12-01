const diaryService = require('../models/services/diary.service')
const router = require('express-promise-router')();

/*TODO
    comments: /diary/health/get should get record by date
 */
// routes:
router.get('/health/get', getHealthRecord);
router.get('/activity/get', getActivityRecord);
router.get('/diet/get', getFoodRecord);
router.put('/health/put', putHealthRecord);
router.put('/activity/put', putActivityRecord);
router.put('/food/put', putFoodRecord);
router.delete('/health/delete', deleteHealthRecord);
router.delete('/activity/delete', deleteActivityRecord);
router.delete('/food/delete', deleteFoodRecord);

module.exports = router;


//TODO: do this two first
async function putHealthRecord(req, res) { }
async function putFoodRecord(req, res) { }


/*
  TODO: this one is done, do not modify
 */
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







async function getHealthRecord(req, res) {
  diaryService.getHealthRecord()
  //.......
}

async function getActivityRecord(req, res) {

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

async function newDiary(req, res){
  try{
    response = await diaryService.createNewDiary(req.body);
    if (response === "success"){
      res.send({
        status: "X103"
      })
    } else {
      res.sebd({
        status: "X003",
        message: response
      })
    }
  } catch(err){
    res.send({
      status: "X003",
      message: err      
    })
  }
}
