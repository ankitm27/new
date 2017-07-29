var mongoose = require("mongoose");
var AutoIncrement = require('mongoose-sequence');

var userSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    user_type: { type: Number },
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


module.exports = mongoose.model("User", userSchema);