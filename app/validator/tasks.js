const resp = require('../config/responseMessage')
const universalfunction = require('../utils/middlewareFunction')
const Joi = require('joi');
const logger = require('../utils/logging');

exports.createTaskStage = createTaskStage;
exports.createTask = createTask;
exports.changeTaskStage =changeTaskStage;
exports.getAllTasks = getAllTasks;
exports.createSubTask = createSubTask;
exports.deleteTask = deleteTask;
exports.getAllTaskStages = getAllTaskStages;
exports.fetchTaskHistory = fetchTaskHistory;
exports.deleteTaskStage = deleteTaskStage;
exports.getStageById = getStageById;
exports.getAllChild = getAllChild;

function createTaskStage(req, res, next) {
    var user_id = req.body.user_id;
    var task_sequence = req.body.task_sequence;
    var task_name = req.body.task_name;
    

    const schema = Joi.object().keys({
        user_id: Joi.string().required(),
        task_name: Joi.string().required(),
        task_sequence: Joi.number().integer().required()
    })
    Joi.validate({ user_id: user_id, task_name: task_name, task_sequence: task_sequence }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
}

function createTask(req,res,next){
    var task_name = req.body.task_name;
    var description = req.body.task_description;
    var due_date = req.body.due_date;
    var admin_id = req.body.user_id;
    var stage_id = req.body.stage_id;
    var user_id = req.body.assigned_user_id;
    var user_name = req.body.user_name;

    const schema = Joi.object().keys({
        task_name: Joi.string().required(),
        description: Joi.string().required(),
        due_date:Joi.string().required(),
        admin_id:Joi.string().required(),
        stage_id:Joi.string().required(),
        user_id:Joi.string().required(),
        user_name:Joi.string().required()    

})
    
    Joi.validate({ task_name: task_name, description: description, due_date: due_date,admin_id:admin_id,stage_id:stage_id,user_id:user_id,user_name:user_name }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
}




function changeTaskStage(req,res,next){
    var task_id = req.body.task_id;
    var user_id = req.body.user_id;
    var task_stage_id = req.body.task_stage_id;
    var parent_id = req.body.parent_id;
    var stage_name = req.body.stage_name;
    var user_name = req.body.user_name;
    
    const schema = Joi.object().keys({
        task_id: Joi.string().required(),
        user_id: Joi.string().required(),
        task_stage_id:Joi.string().required(),
        stage_name:Joi.string().required(),
        user_name:Joi.string().required()    
    })
    
    Joi.validate({ task_id: task_id, user_id: user_id, task_stage_id: task_stage_id,stage_name:stage_name,user_name:user_name }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
}



function getAllTasks(req,res,next){
    var user_id = req.body.user_id;
    const schema = Joi.object().keys({
        user_id: Joi.string().required(),
    })
   
    Joi.validate({ user_id: user_id}, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
}



function createSubTask(req,res,next){
    var parent_id = req.body.parent_id;
    var admin_id = req.body.user_id;
    var task_name = req.body.task_name;
    var task_description = req.body.task_description;
    var due_date = req.body.due_date;
    var user_id = req.body.assigned_user_id;
    var stage_id = req.body.stage_id;

    const schema = Joi.object().keys({
        parent_id: Joi.string().required(),
        admin_id: Joi.string().required(),
        task_name:Joi.required(),
        task_description:Joi.required(),
        due_date:Joi.required(),
        user_id:Joi.required(),
        stage_id:Joi.required()            
    })
    
    Joi.validate({ parent_id: parent_id, admin_id: admin_id, task_name: task_name,task_description:task_description,due_date:due_date,user_id:user_id,stage_id:stage_id }, schema, function (err, result) {
        if (err) {
            console.log("error");
            console.log(err);    
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            console.log("successful");
            next();
        }

    })
}


function fetchTaskHistory(req,res,next){
    var task_id = req.body.task_id;
    var user_id = req.body.user_id;

    const schema = Joi.object().keys({
        task_id: Joi.string().required(),
        user_id:Joi.string().required()    
 })
    
    Joi.validate({ task_id: task_id,user_id:user_id }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
}

function deleteTask(req,res,next){
    var task_id = req.body.task_id;
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var task_name = req.body.task_name;
    
    const schema = Joi.object().keys({
        task_id: Joi.string().required(),
        user_id: Joi.string().required(),
        task_name:Joi.required(),
        user_name:Joi.string().required()            
    })
    Joi.validate({ task_id: task_id,user_id:user_id,task_name:task_name,user_name:user_name }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
}

function deleteTaskStage(req,res,next){
    var stage_id = req.body.stage_id;
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var stage_name = req.body.stage_name;

    const schema = Joi.object().keys({
        user_id:Joi.string().required(),
        stage_id: Joi.string().required(),
        stage_name: Joi.string().required(),
        user_name:Joi.string().required()
    })
    Joi.validate({ user_id: user_id,stage_id:stage_id,stage_name:stage_name,user_name:user_name }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
  
}

function getAllTaskStages(req,res,next){
    var user_id = req.body.user_id;
    const schema = Joi.object().keys({
        user_id:Joi.string().required()
    })
    Joi.validate({ user_id: user_id }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
}

function getStageById(req,res,next){
    var stage_id = req.body.stage_id;
    const schema = Joi.object().keys({
        stage_id:Joi.string().required()
    })
    Joi.validate({ stage_id: stage_id }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
}

function getAllChild(req,res,next){
    var task_id = req.body.task_id;
    const schema = Joi.object().keys({
        task_id:Joi.string().required()
    })
    Joi.validate({ task_id: task_id }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })
}

