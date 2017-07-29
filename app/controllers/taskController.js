const TaskStage = require('../models/taskStage');
const Task=require('../models/tasks');
const async = require('async');
const resp = require('../config/responseMessage')
const universalfunction = require('../utils/middlewareFunction')
const TaskHistory=require('../models/taskHistory');
const logger = require('../utils/logging');

exports.createTaskStage = createTaskStage;
exports.getAllTaskStages= getAllTaskStages;
exports.updateTaskStageName = updateTaskStageName;
exports.createTask = createTask;
exports.changeTaskStage = changeTaskStage;
exports.getAllTasks = getAllTasks;
exports.getAllUserTasks = getAllUserTasks;
exports.createSubTask = createSubTask;
exports.fetchTaskHistory = fetchTaskHistory;

function createTaskStage(req, res) {
    var task_sequence = req.body.task_sequence;
    var task_name = req.body.task_name;
    
    async.auto({
        checkTaskStagePresentWithSameName:function(cb){
          TaskStage.count({ 'task_name': task_name },function (err, userCount) {
            if(err){
               logger.trace("there is some problem to create task stage",err);
               cb(resp.ERROR.INVALID_PARAMETER);
            }else if(userCount!=0){
                logger.trace("task name already exist",usercount);
                cb(resp.ERROR.TASK_ALREADY_EXIST);
            }else{
                logger.trace("user can create task",userCount);
                cb(null,userCount);
            }    
    })
    },
       incrementValueOfOtherTaskStage:function(cb){
        TaskStage.update({ "task_sequence": {$gte: task_sequence}}, { $inc: { "task_sequence": 1 } }, { multi: true },function(err,result){
         if(err){
             logger.trace("there is some problem to update other task sequence",err);
             cb(resp.ERROR.INVALID_PARAMETER);
         }else{
             logger.trace("task sequence update",result);
             cb(null,result);
         }
        })   
    },
        createTaskStage:['checkTaskStagePresentWithSameName',function(result,cb){
        let taskStage = new TaskStage({
            task_sequence:task_sequence,
            task_name:task_name
            // created_by:created_by
        })
        taskStage.save(function(err,res){
            if(err){
                 logger.trace("can not create new stage",err);
                 cb(resp.ERROR.INVALID_PARAMETER);
            }else{
                logger.trace("task stage created successfully",res);
                cb(null,res);
            }
        })
        }]
    },function(err,response){
         if(err){
           logger.trace("there is some problem to create new stage",err);  
           universalfunction.sendError(err,res);  
         }else{
             logger.trace("New stage created successfully",response);
             universalfunction.sendSuccess(resp.SUCCESS.TASK_STAGE_CREATED,null,res);
         }
    })
}





function getAllTaskStages(req, res) {
     TaskStage.find({},{"task_sequence":1,"_id":1,"task_name":1}, function (err, result) {
        if (err) {
            logger.trace("there is some problem to fetch all stages",err);
            universalfunction.sendError(resp.ERROR.ERROR_GET_STAGE, res);
        } else {
            logger.trace("find all task stages",result);
            universalfunction.sendSuccess(resp.SUCCESS.GOT_TASK_STAGE, result, res);
        }
    })
} 


function getAllTasks(req,res){
    async.series([
      function(cb){
      Task.find({},{"__v":0}, function (err, result) {
        if (err) {
            logger.trace("there is some error to find all tasks",err);
            cb(resp.ERROR.ERROR_GET_TASK);  
        } else {
            logger.trace("get all tasks",result);
            cb(null,result);
        }
    })
      }   
    ],function(err,result){
        if(err){
            logger.trace("there is some error to find all tasks",err);
            universalfunction.sendError(err, res);
        }else{
            logger.trace("get all tasks",result);
            universalfunction.sendSuccess(resp.SUCCESS.GOT_TASKS, result, res);
        }
    }
    )
}

function getAllUserTasks(req,res){
    var user_id = req.body.user_id;
    async.series([
      function(cb){
      Task.find({"user_id":user_id},{"__v":0}, function (err, result) {
        if (err) {
            logger.trace("there is some problem to fetch all user tasks",err);
            cb(resp.ERROR.ERROR_GET_TASK);  
        } else {
            logger.trace("get all user tasks",result);
            cb(null,result);
        }
    })
      }   
    ],function(err,result){
        if(err){
            logger.trace("there is some problem to fetch all user details",err);
            universalfunction.sendError(err, res);
        }else{
            logger.trace("get all user tasks",result);
            universalfunction.sendSuccess(resp.SUCCESS.GOT_TASKS, result, res);
        }
    }
    )
}





function updateTaskStageName(req,res){
    var task_sequence = req.body.task_sequence;
    var task_name = req.body.new_name;
    async.auto({
    checkTaskStagePresentWithSameName:function(cb){
          TaskStage.count({ 'task_name': task_name },function (err, userCount) {
            if(err){
               logger.trace("there is some problem to update task stage", err); 
               cb(resp.ERROR.INVALID_PARAMETER);
            }else if(userCount!=0){
                logger.trace("there is some problem to update task name",usercount);
                cb(resp.ERROR.TASK_ALREADY_EXIST);
            }else{
                logger.trace("it can update task",userCount);
                cb(null,userCount);
            }    
    })
},
    updateTaskStageName:['checkTaskStagePresentWithSameName',function(result,cb){
     TaskStage.update({ "task_sequence": task_sequence}, { "task_name": task_name } ,function(err,result){
         if(err){
            logger.tarce("there is some proble to update stage",err); 
            cb(resp.ERROR.INVALID_PARAMETER);
         }else{
             logger.trace("update stage name",result);
             cb(null,result);
         }
        })

    }
 ]
    },function(err,result){
        if(err){
            logger.trace("there is some problem to update stage",err);
            universalfunction.sendError(err, res);
        }else{
            logger.trace("update stage name",result);
            universalfunction.sendSuccess(resp.SUCCESS.UPDATED_SUCCESSFULLY, null, res);
        }
    })
}


// function createTask(req, res) {
//     var task_name = req.body.task_name;
//     var description = req.body.task_description;
//     var due_date = req.body.due_date;
//     var admin_id = req.body.user_id;
//     var stage_id = req.body.stage_id;
//     var user_id = req.body.assigned_user_id;
//     async.auto({
//        taskWithSameNameIsAvailableOrNot:function(cb){
//            Task.count({ 'task_name': task_name },function (err, userCount) {
//             if(err){
//                cb(resp.ERROR.INVALID_PARAMETER);
//             }else if(userCount!=0){
//                 cb(resp.ERROR.USER_TASK_ALREADY_EXIST);
//             }else{
//                 cb(null,userCount);
//             }    
//     })
       

//        },
//        createNewTask:['taskWithSameNameIsAvailableOrNot', function (result,cb) {
//             let task_row = {
//                 task_name: task_name,
//                 description: description,
//                 due_date: due_date,
//                 admin_id: admin_id,
//                 stage_id: stage_id,
//                 user_id:user_id    
//         }
            
//             let task = new Task(task_row)

//             task.save(function (err, result) {
//                 if (err) {
//                     cb(resp.ERROR.INVALID_PARAMETER)
//                 } else {
//                     cb(null,result)
//                 }
//             })
//         }]
//     }, function (err, result) {
//         if (err) {
//             universalfunction.sendError(err, res);
//         } else {
//             universalfunction.sendSuccess(resp.SUCCESS.TASK_CREATED, null, res);
//         }
//     })
// }
//                  }else{
//                      if(result.nModified){
//                      cb(null,result);
//                   }else if(result.n){
//                         cb(resp.ERROR.CHANGING_TO_SAME_STATE)
//                     }else{
//                         cb(resp.ERROR.CHILD_TASK_EXIST)
//                     }
//                  }  
//             })
//         }],
//         updateParentStatus:['checkParticularTaskbelongtoGivenUser','updateTaskStage',function(result,cb){
//              Task.find({"parent_id":parent_id}).populate("stage_id").exec(function(err,res){
//                  if(err){
//                      console.log(err);
//                      cb(resp.ERROR.ERROR_CHANGE_PARENT_STATE) 
//                 }else{
//                     var _id = res[0].stage_id._id;
//                     var task_sequence = res[0].stage_id.task_sequence;
//                     for(var i = 0;i< res.length;i++){
//                           if(parseInt(res[i].stage_id.task_sequence) < parseInt(task_sequence)){
//                               _id = res[i].stage_id._id;
//                               task_sequence = res[i].stage_id.task_sequence;
//                           }    
//                     }
//                     Task.update({"_id":parent_id},{"stage_id":_id},function(err,res){
//                       if(err){
//                           console.log("there is some problem to  update parent stage");
//                           cb(resp.ERROR.ERROR_CHANGE_PARENT_STATE)
//                       }else{
//                           console.log("result",res);
//                           cb(null,res);      
//                       }  
//                     })
                    
                    
                    
                    
//             }
//              })           
//         }]
//     },function(err,result){
//         if(err){
//             universalfunction.sendError(err, res);
//         }else{
//             universalfunction.sendSuccess(resp.SUCCESS.STAGE_CHANGED, null, res);
//         }
//     })
// }



function createTask(req, res) {
    var task_name = req.body.task_name;
    var description = req.body.task_description;
    var due_date = req.body.due_date;
    var admin_id = req.body.admin_id;
    var stage_id = req.body.stage_id;
    async.auto({
       taskWithSameNameIsAvailableOrNot:function(cb){
           Task.count({ 'task_name': task_name },function (err, userCount) {
            if(err){
               cb(resp.ERROR.INVALID_PARAMETER);
            }else if(userCount!=0){
                cb(resp.ERROR.USER_TASK_ALREADY_EXIST);
            }else{
                cb(null,userCount);
            }
    })


       },
       createNewTask:['taskWithSameNameIsAvailableOrNot', function (result,cb) {
            let task_row = {
                task_name: task_name,
                description: description,
                due_date: due_date,
                admin_id: admin_id,
                stage_id: stage_id
            }
            if (req.body.user_id) {
                task_row["user_id"] = req.body.user_id;
            }
            let task = new Task(task_row)

            task.save(function (err, result) {
                if (err) {
                    cb(resp.ERROR.INVALID_PARAMETER)
                } else {
                    cb(null,result)
                }
            })
        }]
    }, function (err, result) {
        if (err) {
            universalfunction.sendError(err, res);
        } else {
            universalfunction.sendSuccess(resp.SUCCESS.TASK_CREATED, null, res);
        }
    })
}





function changeTaskStage(req,res){
    var task_id = req.body.task_id;
    var user_id = req.body.user_id;
    var task_stage_id = req.body.task_stage_id;
    var parent_id = req.body.parent_id;

    async.auto({
        checkParticularTaskbelongtoGivenUser:function(cb){
           Task.count({ '_id':task_id,'user_id':user_id },function (err, userCount) {
            if(err){
               cb(resp.ERROR.INVALID_PARAMETER);
            }else if(userCount==0){
                cb(resp.ERROR.USER_NOT_BELONG);
            }else{
                cb(null,userCount);
            }
          })
        },
        updateTaskStage:['checkParticularTaskbelongtoGivenUser',function(result,cb){
            Task.update({'_id':task_id,'is_child':0},{'stage_id':task_stage_id},function(err,result){
                 if(err){
                     cb(resp.ERROR.STAGE_NOT_CHANGE);
                 }else{
                     if(result.nModified){
                     cb(null,result);
                  }else if(result.n){
                        cb(resp.ERROR.CHANGING_TO_SAME_STATE)
                    }else{
                        cb(resp.ERROR.CHILD_TASK_EXIST)
                    }
                 }
            })
        }],
          updateParentStatus:['checkParticularTaskbelongtoGivenUser','updateTaskStage',function(result,cb){
             Task.find({"parent_id":parent_id}).populate("stage_id").exec(function(err,res){
                 if(err){
                     console.log(err);
                     cb(resp.ERROR.ERROR_CHANGE_PARENT_STATE) 
                }else{
                    var _id = res[0].stage_id._id;
                    var task_sequence = res[0].stage_id.task_sequence;
                    for(var i = 0;i< res.length;i++){
                          if(parseInt(res[i].stage_id.task_sequence) < parseInt(task_sequence)){
                              _id = res[i].stage_id._id;
                              task_sequence = res[i].stage_id.task_sequence;
                          }    
                    }
                    Task.update({"_id":parent_id},{"stage_id":_id},function(err,res){
                      if(err){
                          console.log("there is some problem to  update parent stage");
                          cb(resp.ERROR.ERROR_CHANGE_PARENT_STATE)
                      }else{
                          console.log("result",res);
                          cb(null,res);      
                      }  
                    })
                    
                    
                    
                    
            }
             })           
        }]

    },function(err,result){
        if(err){
            universalfunction.sendError(err, res);
        }else{
            universalfunction.sendSuccess(resp.SUCCESS.STAGE_CHANGED, null, res);
        }
    })
}











function createSubTask(req,res){
    var parent_id = req.body.parent_id;
    var admin_id = req.body.user_id;
    var task_name = req.body.task_name;
    var task_description = req.body.task_description;
    var due_date = req.body.due_date;
    var user_id = req.body.assigned_user_id;
    var stage_id = req.body.stage_id;

    async.auto({
        inputValidation:function(cb){
           let len = task_name.length;
           if( len == task_description.length  && len == due_date.length  && len == user_id.length && len== stage_id.length){
               cb(null,task_name.length);
           }else{
               cb(resp.ERROR.INVALID_PARAMETER)
           }
        },
        createJson:["inputValidation",function(result,cb){
            var data_to_insert = [];
            for(var i = 0;i<task_name.length;i++){
                let data_raw = {
                "parent_id": parent_id,
                "admin_id" : admin_id,
                "task_name" : task_name[i],
                "description" : task_description[i],
                "due_date" : due_date[i],
                "user_id" : user_id[i],
                "stage_id" : stage_id[i]
             }
             console.log(data_raw);
            data_to_insert.push(data_raw); 
            }
           cb(null,data_to_insert)    
    }],
    savedChildTask:['inputValidation','createJson',function(result,cb){
            Task.insertMany(result.createJson,function(err,result){
              if(err){
                  cb(resp.ERROR.CAN_NOT_CREATED_SUB_TASK)
              }else{
                  console.log("result" + result);
                  cb(null,result);
              }
          })            
    }],
    findParentStageId:['inputValidation','createJson','savedChildTask',function(result,cb){
         TaskStage.find({ "_id" : { $in : stage_id }} ,function(err,res){
             if(err){
                console.log("error change parent state",err);
                cb(resp.ERROR.ERROR_CHANGE_PARENT_STATE); 
             }else{
                var _id = res[0]._id;
                var task_sequence = res[0].task_sequence;
                    for(var i = 0;i< res.length;i++){
                          if(parseInt(res[i].task_sequence) < parseInt(task_sequence)){
                              _id = res[i].stage_id._id;
                              task_sequence = res[i].stage_id.task_sequence;
                          }    
                }
                cb(null,_id);
             }
         })
    }],
    changeParentIsChild:['inputValidation','createJson','savedChildTask','findParentStageId',function(result,cb){
        Task.update({"_id":parent_id},{"is_child":1,"stage_id":result.findParentStageId},function(err,result){
            if(err){
                cb(resp.ERROR.ERROR_CHANGE_PARENT_STATE);
            }else{
                cb(null,result);
            }
        })
    }]
},function(err,result){
        if(err){
            universalfunction.sendError(err, res);
        }else{
            universalfunction.sendSuccess(resp.SUCCESS.SUB_TASK_CREATED, null, res);
        }
    })
}



function fetchTaskHistory(req,res){
    var task_id = req.body.task_id;
    async.series([
    function(cb){
    TaskHistory.find({ $or:[ {'task_id':task_id}, {'parent_id':task_id} ]},{"task_id":1,"parent_id":1,"history":1},function(err,result){
      if(err){
        cb(resp.ERROR.ERROR_FETCH_DETAILS);  
      }else{
        cb(null,result);
      }    
    })
}
],function(err,result){
    if(err){
        universalfunction.sendError(err, res);
    }    else{
        universalfunction.sendSuccess(resp.SUCCESS.FETCH_TASK_HISTORY, result[0], res);
    }
    }
)
}




