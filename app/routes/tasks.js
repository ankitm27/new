var express = require('express');
var router = express.Router();

var taskController = require('../controllers/taskController');
var taskValidator = require('../validator/tasks');
var adminValidator = require('../validator/checkadmin');

router.post('/createtaskstage',taskValidator.createTaskStage,adminValidator.IsAdmin,taskController.createTaskStage);
router.post('/getallstaskstages',taskValidator.getAllTaskStages,adminValidator.IsAdmin,taskController.getAllTaskStages);
router.post('/updatetaskstagename',adminValidator.IsAdmin,taskController.updateTaskStageName);
router.post('/createtask',taskValidator.createTask,adminValidator.IsAdmin,taskController.createTask);
router.post('/changetaskstage',taskValidator.changeTaskStage,taskController.changeTaskStage);
router.post('/getalltasks',taskValidator.getAllTasks,adminValidator.IsAdmin,taskController.getAllTasks);
router.post('/getallusertasks',taskValidator.getAllTasks,taskController.getAllUserTasks);
router.post('/createsubtask',taskValidator.createSubTask,adminValidator.IsAdmin,taskController.createSubTask);
router.post('/fetchtaskhistories',taskValidator.fetchTaskHistory,adminValidator.IsAdmin,taskController.fetchTaskHistory);
router.post('/deletetask',taskValidator.deleteTask,adminValidator.IsAdmin,taskController.deleteTask);
router.post('/deletetaskstage',taskValidator.deleteTaskStage,adminValidator.IsAdmin,taskController.deleteTaskStage);
router.post('/getstagebyid',taskValidator.getStageById,taskController.getStageById);
router.post('/getallchild',taskValidator.getAllChild,taskController.getAllChild);
module.exports = router;
