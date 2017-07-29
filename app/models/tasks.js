var mongoose = require("mongoose");
var AutoIncrement = require('mongoose-sequence');
const User = require('./users');
const TaskStage = require('./taskStage');
const async = require('async');
const Task=require('./tasks');


var UserTaskSchema = new mongoose.Schema({
    task_name: { type: String },
    description: { type: String },
    due_date: { type: Date },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    stage_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskStage'
    },
    is_child :{
        type:Boolean,
        default:0
    }
});




module.exports = mongoose.model("Task", UserTaskSchema);