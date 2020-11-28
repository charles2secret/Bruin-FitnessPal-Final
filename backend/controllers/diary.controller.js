const diaryService = require('../models/services/diary.service')
const router = require('express-promise-router')();

// routes:
router.get('/health', getHealthRecord)

module.exports = router;

function getHealthRecord(req, res) {
    diaryService.getHealthRecord()
    //.......
}


/*
   TODO: referring to GroupMe discussion, there will be 4 panels:
      panel1: activity panel, we should return activity object in Json
      panel2: diet, same as panel1
      panel3: calorie, we need to add some functions in diary.entity.js
            so that each time they ask for calorie, we compute one
            or, we can store it and update once new food is added
      panel4: Health: just return a Json that has three basic numbers
            sleep in minute, weight in kg(or lbs if you like :), water in ml
 */
