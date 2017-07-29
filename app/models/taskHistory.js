var mongoose = require("mongoose");

var taskHistorySchema = new mongoose.Schema({
    task_id: { type: String},
    parent_id: { type: String },
    created_at: {
        type: Date,
        default: Date.now,
        setDefaultsOnInsert: true
    },
    history:{type:String}
    
});



module.exports = mongoose.model("task_history", taskHistorySchema);