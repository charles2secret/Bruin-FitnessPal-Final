const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: make sure add to export module after writing your function
//      and check comment below before start
// userDiary.save()
// ref:
// https://mongoosejs.com/docs/subdocs.html

/* TODO:
    general design pattern:
    (if your design is faster, let me know)
    1. dairies (with unique id)  has arrays of foodDiaries
    2. -> foodDiaries (with unique date) has arrays of food
    3. -> food (single food) with calorie, timeOfDay, etc
 */
var diaryFactory = {}
diaryFactory.createDiary = createDiary;

//add export functions here....
module.exports = diaryFactory;

const foodSchema = new Schema({
    foodName: {type: String, required: true},
    calorieConsumed : {default: -1, type: Number},
    timeOfDay: {
        type: String,
        required: true,
        num:["breakfast",
            "morning snack",
            "lunch",
            "afternoon snack",
            "dinner",
            "after dinner"]},
    totalFat: {type: Number},
    totalProtein: {type: Number},
    totalCarbs: {type: Number},
    totalSodium: {type: Number},
    totalFiber: {type: Number},
});

const foodDiarySchema = new Schema({
    date: {
        unique: true,
        required: true, type: String,
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
        required: true, //TODO: check with frontend
        num:["breakfast",
            "morning snack",
            "lunch",
            "afternoon snack",
            "dinner",
            "after dinner"]},
});

const activityDiarySchema = new Schema({
    date: {
        unique: true,
        required: true, type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyCalorieConsumed: {default: 0, type: Number},
    activity: [activitySchema]
});


const waterDiarySchema = new Schema({
    date: {
        unique: true,
        required: true, type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    dailyWaterConsumed: {default: 0, type: Number}
});

//TODO: weight is string because I don't want to deal with
//      type conversion (kg/lbs) and days without record
const weightDiarySchema = new Schema({
    date: {
        unique: true,
        required: true, type: String,
        match:/^\d{4}-\d{2}-\d{2}$/
    },
    weight: {type: String, default: "no record for today"}
});

//TODO: sleepTime is in minutes, 540min = 9hrs
const sleepDiarySchema = new Schema({
    date: {
        unique: true,
        required: true, type: String,
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
    weightDairy: [weightDiarySchema],
    sleepDiary: [sleepDiarySchema]
});

const diaryModel = mongoose.model('Dairy',diarySchema);

/*
    TODO:simple function, not done yet
     please register a newUser and check mongo atlas
     to see how my dataSchema works
 */
function createDiary(accountId) {
    const userDiary = new diaryModel({
        accountId: accountId
    });
    userDiary.foodDiary.push({
        date: "2020-10-10"
    });
    userDiary.foodDiary[0].food.push({
        foodName: "hambuger",
        timeOfDay: "breakfast"
    });
    userDiary.save();
}
