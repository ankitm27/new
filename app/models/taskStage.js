var mongoose = require("mongoose");
var AutoIncrement = require('mongoose-sequence');

const User = require('./users');

var taskStageSchema = new mongoose.Schema({
    task_sequence: { type: Number},
    task_name: { type: 'String' },
    created_at: {
        type: Date,
        default: Date.now,
        setDefaultsOnInsert: true
    },
    updated_at: {
        type: Date,
        default: Date.now,
        setDefaultsOnInsert: false
    }
});



module.exports = mongoose.model("TaskStage", taskStageSchema);