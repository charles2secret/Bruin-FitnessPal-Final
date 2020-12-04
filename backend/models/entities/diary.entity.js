const mongoose = require('mongoose');
const util = require('./utilFunc.js');
const Schema = mongoose.Schema;

var diaryFactory = {}
diaryFactory.createDiary = createDiary;

diaryFactory.containFoodDiary = containFoodDiary;
diaryFactory.createFoodDiary = createFoodDiary;
diaryFactory.putFoodRecord = putFoodRecord;
diaryFactory.getFoodDiary = getFoodDiary;

diaryFactory.containActivityDiary = containActivityDiary;
diaryFactory.createActivityDiary = createActivityDiary;
diaryFactory.putActivityRecord = putActivityRecord;
diaryFactory.getActivityDiary = getActivityDiary;

diaryFactory.containWaterDiary = containWaterDiary;
diaryFactory.createWaterDiary = createWaterDiary;
diaryFactory.putWaterRecord = putWaterRecord;
diaryFactory.getWaterDiary = getWaterDiary;

diaryFactory.containWeightDiary = containWeightDiary;
diaryFactory.createWeightDiary = createWeightDiary;
diaryFactory.putWeightRecord = putWeightRecord;
diaryFactory.getWeightDiary = getWeightDiary;

diaryFactory.containSleepDiary = containSleepDiary;
diaryFactory.createSleepDiary = createSleepDiary;
diaryFactory.putSleepRecord = putSleepRecord;
diaryFactory.getSleepDiary = getSleepDiary;

module.exports = diaryFactory;

const foodSchema = new Schema({
    foodName: {type: String, required: true},
    calorieConsumed : {default: 0, type: Number},
    timeOfDay: {
        type: String,
        required: true,
        num:["breakfast",
            "lunch",
            "dinner",
            "snack"]},
    totalFat: {type: Number, default: 0},
    totalProtein: {type: Number, default: 0},
    totalCarbs: {type: Number, default: 0},
    totalSodium: {type: Number, default: 0},
    totalFiber: {type: Number, default: 0}
});

const foodDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyCalorieConsumed: {default: 0, type: Number},
    food: [foodSchema]
});

const activitySchema = new Schema({
    activityName: {type: String, require: true},
    activityType: {
        type: String,
        require:true,
        enum: ["cardio", "weight-training"]
    },
    calorieBurned: {type: Number, require: true},
    duration: {type: Number, required: true}, //in minutes
    timeOfDay: {
        type: String,
        //required: true, //TODO: check with frontend
        num:["morning",
            "noon",
            "afternoon",
            "evening"]},
});

const activityDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyCalorieBurned: {default: 0, type: Number},
    activity: [activitySchema]
});


const waterDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyWaterConsumed: {default: 0, type: Number}
});


const weightDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    weight: {type: String, default: "no record for today"}
});


const sleepDiarySchema = new Schema({
    date: {
        required: true,
        type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    sleepTime: {type: Number, default: 540}
});

const diarySchema = new Schema ({
    accountId: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        immutable: true,
        trim: true,
        minlength: 6,
        maxlength: 20
    },
    foodDiary: [foodDiarySchema],
    activityDiary: [activityDiarySchema],
    waterDiary: [waterDiarySchema],
    weightDiary: [weightDiarySchema],
    sleepDiary: [sleepDiarySchema]
});

const diaryModel = mongoose.model('Diary',diarySchema);


/**
 * create a diary by accountId
 *
 * @param {String} accountId
 * @return {Boolean} status of creation
 */
async function createDiary(accountId) {
    try{
        const newDiary = new diaryModel({accountId: accountId});
        let userDiary = await newDiary.save();
        if (userDiary == null){
            console.log("unable to create Diary for user: ", accountId);
            return false;
        }
        return true;
    } catch(err){
        util.HandleError(err, "diary.entity.js", "createDiary","accountId: " + accountId);
        return false;
    }
}

/**
 * check if a food diary is exist for date: date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} whether a food diary exists
 */
async function containFoodDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let foodDiary = response.foodDiary;
        for (let i=0; i<foodDiary.length; i++) {
            if (foodDiary[i].date === date) return true;
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "containFoodDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}

/**
 * create a new food diary array by date, this should not be invoked
 * without prior calling to containFoodDiary to check if such array
 * alaready exists 
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} successful creation of food diary or not
 */
async function createFoodDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        response.foodDiary.push({date: date});
        await response.save();
        return true;
    } catch (err) {
        util.HandleError(err, "diary.entity.js","createFoodDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}

/**
 * get food record by date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {JSON} diary is null if not found
 */
async function getFoodDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let diaries =  response.foodDiary;
        for (let i=0; i<diaries.length; i++) {
            if (diaries[i].date === date) return diaries[i];
        }
        return null;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "getFoodDiary", "accountId: ", accountId, "date: ", date);
        return null;
    }
}

/**
 * put a food record into specific food diary (categorized by date)
 * this should not be invoked alone, see functions above
 * @param {String} accountId
 * @param {String} date
 * @param {JSON} food
 * @return {Boolean} successful creation of food record or not
 */
async function putFoodRecord(accountId, date, food) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        for (let i=0; i<response.foodDiary.length; i++) {
            if (response.foodDiary[i].date === date) {
                response.foodDiary[i].food.push(food);
                if (food.calorieConsumed > 0) {
                    response.foodDiary[i].dailyCalorieConsumed =
                        Number(response.foodDiary[i].dailyCalorieConsumed) +
                        Number(food.calorieConsumed);
                }
                if (food.totalFat > 0) {
                    response.foodDiary[i].dailyCalorieConsumed =
                    Number(response.foodDiary[i].dailyCalorieConsumed) +
                        Number(Number(food.totalFat) * 9);
                }
                if (food.totalCarbs > 0) {
                    response.foodDiary[i].dailyCalorieConsumed =
                        Number(response.foodDiary[i].dailyCalorieConsumed) +
                        Number(Number(food.totalCarbs) * 4);
                }
                if (food.totalProtein > 0) {
                    response.foodDiary[i].dailyCalorieConsumed =
                        Number(response.foodDiary[i].dailyCalorieConsumed) +
                        Number(Number(food.totalProtein) * 4);
                }
                let status = await response.save();
                return true;
            }
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "putFoodRecord", "accountId: ", accountId, "date: ", date, "food: ", food);
        return false;
    }
}

/**
 * get activity record by date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {JSON} diary is null if not found
 */
async function getActivityDiary(accountId, date){
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let diaries =  response.activityDiary;
        for (let i=0; i<diaries.length; i++) {
            if (diaries[i].date === date) {
                return diaries[i];
            }
        }
        return null;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "getActivityDiary", "accountId: ", accountId, "date: ", date);
        return null;
    }
}


/**
 * check if an activity diary is exist for date: date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} whether an activity diary exists
 */
async function containActivityDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let activityDiary = response.activityDiary;
        for (let i=0; i<activityDiary.length; i++) {
            if (activityDiary[i].date === date) {
                return true;
            }
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "containActivityDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}


/**
 * create a new activity diary by date, this should not be invoked
 * without prior calling to containActivityDiary
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} successful creation of activity diary or not
 */
async function createActivityDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        response.activityDiary.push({date: date});
        await response.save();
        return true;
    } catch (err) {
        util.HandleError(err, "diary.entity.js","createActivityDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}


/**
 * put an activity into specific activitydiary
 * this should not be invoked alone, see functions above
 * @param {String} accountId
 * @param {String} date
 * @param {JSON} activity
 * @return {Boolean} successful creation of activitydiary or not
 */
async function putActivityRecord(accountId, date, activity) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        for (let i=0; i<response.activityDiary.length; i++) {
            if (response.activityDiary[i].date === date) {
                response.activityDiary[i].activity.push(activity);
                response.activityDiary[i].dailyCalorieBurned =
                    Number(response.activityDiary[i].dailyCalorieBurned)+
                    Number(activity.calorieBurned);
                let status = await response.save();
                return true;
            }
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "putActivityRecord", "accountId: ", accountId, "date: ", date, "activity: ", activity);
        return false;
    }
}

/**
 * check if a water diary is exist for date: date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} whether a water diary exists
 */
async function containWaterDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let waterDiary = response.waterDiary;
        for (let i=0; i<waterDiary.length; i++) {
            if (waterDiary[i].date === date) return true;
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "containWaterDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}

/**
 * create a new water diary array by date, this should not be invoked
 * without prior calling to containWaterDiary to check if such array
 * alaready exists 
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} successful creation of water diary or not
 */
async function createWaterDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        response.waterDiary.push({date: date});
        await response.save();
        return true;
    } catch (err) {
        util.HandleError(err, "diary.entity.js","createWaterDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}

/**
 * get water record by date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {JSON} water object is null if not found
 */
async function getWaterDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let diaries =  response.waterDiary;
        for (let i=0; i<diaries.length; i++) {
            if (diaries[i].date === date) return diaries[i];
        }
        return null;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "getWaterDiary", "accountId: ", accountId, "date: ", date);
        return null;
    }
}

/**
 * put a water record into specific water diary (categorized by date)
 * this should not be invoked alone, see functions above
 * @param {String} accountId
 * @param {String} date
 * @param {JSON} water
 * @return {Boolean} successful creation of water record or not
 */
async function putWaterRecord(accountId, date, water) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        for (let i=0; i<response.waterDiary.length; i++) {
            if (response.waterDiary[i].date === date) {
                response.waterDiary[i].dailyWaterConsumed =
                    Number(response.waterDiary[i].dailyWaterConsumed) +
                    Number(water);
                let status = await response.save();
                return true;
            }
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "putWaterRecord", "accountId: ", accountId, "date: ", date, "water: ", water);
        return false;
    }
}

/**
 * check if a weight diary is exist for date: date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} whether a weight diary exists
 */
async function containWeightDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let weightDiary = response.weightDiary;
        for (let i=0; i<weightDiary.length; i++) {
            if (weightDiary[i].date === date) return true;
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "containWeightDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}

/**
 * create a new weight diary array by date, this should not be invoked
 * without prior calling to containWeightDiary to check if such array
 * alaready exists 
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} successful creation of weight diary or not
 */
async function createWeightDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        response.weightDiary.push({date: date});
        await response.save();
        return true;
    } catch (err) {
        util.HandleError(err, "diary.entity.js","createWeightDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}

/**
 * get weight record by date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {JSON} weight object is null if not found
 */
async function getWeightDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let diaries =  response.weightDiary;
        for (let i=0; i<diaries.length; i++) {
            if (diaries[i].date === date) return diaries[i];
        }
        return null;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "getWeightDiary", "accountId: ", accountId, "date: ", date);
        return null;
    }
}

/**
 * put/replace a weight record into specific weight diary (categorized by date)
 * this should not be invoked alone, see functions above
 * @param {String} accountId
 * @param {String} date
 * @param {JSON} weight
 * @return {Boolean} successful creation of weight record or not
 */
async function putWeightRecord(accountId, date, weight) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        for (let i=0; i<response.weightDiary.length; i++) {
            if (response.weightDiary[i].date === date) {
                response.weightDiary[i].weight = weight;
                let status = await response.save();
                return true;
            }
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "putWeightRecord", "accountId: ", accountId, "date: ", date, "weight: ", weight);
        return false;
    }
}

/**
 * check if a sleep diary is exist for date: date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} whether a sleep diary exists
 */
async function containSleepDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let sleepDiary = response.sleepDiary;
        for (let i=0; i<sleepDiary.length; i++) {
            if (sleepDiary[i].date === date) return true;
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "containSleepDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}

/**
 * create a new sleep diary array by date, this should not be invoked
 * without prior calling to containWeightDiary to check if such array
 * alaready exists 
 * @param {String} accountId
 * @param {String} date
 * @return {Boolean} successful creation of sleep diary or not
 */
async function createSleepDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        response.sleepDiary.push({date: date});
        await response.save();
        return true;
    } catch (err) {
        util.HandleError(err, "diary.entity.js","createSleepDiary", "accountId: ", accountId, "date: ", date);
        return false;
    }
}

/**
 * get sleep record by date
 *
 * @param {String} accountId
 * @param {String} date
 * @return {JSON} sleep object is null if not found
 */
async function getSleepDiary(accountId, date) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        let diaries =  response.sleepDiary;
        for (let i=0; i<diaries.length; i++) {
            if (diaries[i].date === date) return diaries[i];
        }
        return null;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "getSleepDiary", "accountId: ", accountId, "date: ", date);
        return null;
    }
}

/**
 * put/replace a sleep record into specific sleep diary (categorized by date)
 * this should not be invoked alone, see functions above
 * @param {String} accountId
 * @param {String} date
 * @param {JSON} sleep
 * @return {Boolean} successful creation of sleep record or not
 */
async function putSleepRecord(accountId, date, sleep) {
    try {
        let response = await diaryModel.findOne({accountId:accountId});
        for (let i=0; i<response.sleepDiary.length; i++) {
            if (response.sleepDiary[i].date === date) {
                response.sleepDiary[i].sleepTime = sleep;
                let status = await response.save();
                return true;
            }
        }
        return false;
    } catch (err) {
        util.HandleError(err, "diary.entity.js", "putSleepRecord", "accountId: ", accountId, "date: ", date, "weight: ", weight);
        return false;
    }
}
