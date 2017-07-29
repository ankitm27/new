var express = require('express');
var router = express.Router();

var taskController = require('../controllers/taskController');
var taskValidator = require('../validator/tasks');
var adminValidator = require('../validator/checkadmin');

router.post('/createtaskstage',taskValidator.createTaskStage,adminValidator.IsAdmin,taskController.createTaskStage);
router.post('/getallstaskstages',taskController.getAllTaskStages);
router.post('/updatetaskstagename',taskController.updateTaskStageName);
router.post('/createtask',taskValidator.createTask,adminValidator.IsAdmin,taskController.createTask);
router.post('/changetaskstage',taskController.changeTaskStage);
router.post('/getalltasks',taskController.getAllTasks);
router.post('/getallusertasks',taskController.getAllUserTasks);
router.post('/createsubtask',taskValidator.createSubTask,adminValidator.IsAdmin,taskController.createSubTask);
router.post('/fetchtaskhistories',taskController.fetchTaskHistory);
router.post('/deletetask',taskValidator.deleteTask,adminValidator.IsAdmin,taskController.deleteTask);
router.post('/deletetaskstage',taskController.deleteTaskStage)
module.exports = router;
