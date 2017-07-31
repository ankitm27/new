'use strict'
exports.ERROR = {
    USER_ALREADY_REGISTERED : {
        statusCode:401,
        customMessage : 'User already exists.',
        type : 'USER_ALREADY_REGISTERED'
    },
      ERROR_IN_QUERY : {
        statusCode:401,
        customMessage : 'Error in query',
        type : 'ERROR_IN_QUERY'
    },
    INVALID_USERNAME : {
        statusCode: 401,
        customMessage: 'This user name is not associated with any account.',
        type: 'INVALID_USERNAME'
    },
    INVALID_CREDENTIALS : {
        statusCode: 401,
        customMessage: 'Oops! The Password is incorrect.',
        type: 'INVALID_CREDENTIALS'
    },
    INVALID_PARAMETER : {
        statusCode: 401,
        customMessage: 'please provide valid parameter.',
        type: 'INVALID_PARAMETER'
    },
    TASK_ALREADY_EXIST : {
        statusCode: 401,
        customMessage: 'Task Stage already exist with same name.',
        type: 'INVALID_TASK_STAGE'
    },
    USER_TASK_ALREADY_EXIST : {
        statusCode: 401,
        customMessage: 'Task already exist with same name.',
        type: 'INVALID_TASK_NAME'
    },
    USER_NOT_FOUND : {
        statusCode: 401,
        customMessage: 'Not able to found all user details.',
        type: 'USER_DETAILS_NOT_FOUND'
    },
    USER_NOT_BELONG : {
        statusCode: 401,
        customMessage: 'Task is assigned to another user,only he can change the stage',
        type: 'USER_NOT_BELONG'
    },
    STAGE_NOT_CHANGE : {
        statusCode: 401,
        customMessage: 'there is some problem to update stage',
        type: 'STAGE_NOT_CHANGE'
    },
    ERROR_GET_STAGE : {
        statusCode: 401,
        customMessage: 'there is some problem to fetch all stage',
        type: 'ERROR_GET_STAGE'
    },
    ERROR_GET_TASK : {
        statusCode: 401,
        customMessage: 'There is some problem to fetch all tasks',
        type: 'ERROR_GET_TASKS'
    },
    CAN_NOT_CREATED_SUB_TASK : {
        statusCode: 401,
        customMessage: 'There is some problem to creating sub task',
        type: 'CAN_NOT_CREATED_SUB_TASK'
    },
    CHILD_TASK_EXIST : {
        statusCode: 401,
        customMessage: 'Child of particular task exist',
        type: 'CHILD_TASK_EXIST'
    },
    CHANGING_TO_SAME_STATE : {
        statusCode: 401,
        customMessage: 'Task already on same state',
        type: 'CHANGING_TO_SAME_STATE'
    },
    FIELD_VALIDATION_FAILED : {
        statusCode: 401,
        customMessage: 'Field validation failed',
        type: 'FIELD_VALIDATION_FAILED'
    },
    NEED_ADMIN_USER_PRIVILIAGE : {
        statusCode: 401,
        customMessage: 'Need admin user priviliage for accessing this api',
        type: 'NEED_ADMIN_USER_PRIVILIAGE'
    },
    LOGIN_FIRST : {
        statusCode: 401,
        customMessage: 'user need to login first',
        type: 'LOGIN_FIRST'
    },
    ERROR_FETCH_DETAILS : {
        statusCode: 401,
        customMessage: 'There is some error in fetching detials',
        type: 'ERROR_FETCH_DETAILS'
    },
    ERROR_CHANGE_PARENT_STATE : {
        statusCode: 401,
        customMessage: 'unable to change parent state.',
        type: 'ERROR_CHANGE_PARENT_STATE'
    },
    ERROR_CHANGE_PARENT_ISCHILD : {
        statusCode: 401,
        customMessage: 'unable to change parent is child.',
        type: 'ERROR_CHANGE_PARENT_ISCHILD'
    },
    ERROR_CREATE_HISTORY : {
        statusCode: 401,
        customMessage: 'There is some to create history.',
        type: 'ERROR_CREATE_HISTORY'
    },
    ERROR_DELETE_TASK : {
        statusCode: 401,
        customMessage: 'There is some to delete history.',
        type: ' ERROR_DELETE_TASK'
    },
    TASK_PRESENT : {
        statusCode: 401,
        customMessage: 'Task present for this stage id please first change stage id of all tasks belongs to this stage id',
        type: 'TASK_PRESENT'
    },
    ERROR_DELETE_TASKSTAGE : {
        statusCode: 401,
        customMessage: 'There is some problem to delete task stage',
        type: 'ERROR_DELETE_TASKSTAGE'
    },
    ERROR_STAGE_FIND_BY_ID : {
        statusCode: 401,
        customMessage: 'There is some error to find stage by id',
        type: 'ERROR_STAGE_FIND_BY_ID'
    },
    ERROR_GET_ALL_CHILD : {
        statusCode: 401,
        customMessage: 'There is some error to get all child',
        type: 'ERROR_GET_ALL_CHILD'
    },
} 



exports.SUCCESS = {
    REGISTERED: {
        statusCode: 201,
        customMessage: 'Registered Successfully',
        type: 'REGISTERED'
    },
    LOGGED_IN : {
        statusCode: 200,
        customMessage: 'Logged In Successfully.',
        type: 'LOGGED_IN'
    },
    TASK_STAGE_CREATED : {
        statusCode: 201,
        customMessage: 'Task Stage Created.',
        type: 'TASK_STAGE_CREATED'
    },
    UPDATED_SUCCESSFULLY: {
        statusCode: 201,
        customMessage: 'Task Stage Updated Successfully.',
        type: 'UPDATED_SUCCESSFULLY'
    },
    TASK_CREATED : {
        statusCode: 201,
        customMessage: 'Task Created.',
        type: 'TASK_CREATED'
    },
    USER_FOUND : {
        statusCode: 200,
        customMessage: 'User Details Found.',
        type: 'USER_DETAILS_FOUND'
    },
    STAGE_CHANGED : {
        statusCode: 200,
        customMessage: 'Task Stage Changed.',
        type: 'STAGE_CHANGED'
    },
    GOT_TASK_STAGE : {
        statusCode: 200,
        customMessage: 'Fetch all stage.',
        type: 'GOT_TASK_STAGE'
    },
    GOT_TASKS : {
        statusCode: 200,
        customMessage: 'Fetch all tasks.',
        type: 'GOT_TASKS'
    },
    SUB_TASK_CREATED : {
        statusCode: 201,
        customMessage: 'Sub Task Created.',
        type: 'SUB_TASK_CREATED'
    },
    LOGOUT_SUCCESSFULLY : {
        statusCode: 201,
        customMessage: 'logout successfully.',
        type: 'LOGOUT_SUCCESSFULLY'
    },
    FETCH_TASK_HISTORY : {
        statusCode: 200,
        customMessage: 'Fetch task history.',
        type: 'FETCH_TASK_HISTORY'
    },
    TASK_DELETED_SUCCESSFULLY : {
        statusCode: 200,
        customMessage: 'Task and all subtask is deleted successfully',
        type: 'TASK_DELETED_SUCCESSFULLY'
    },
    TASK_STAGE_SUCCESSFULLY_DELETED : {
        statusCode: 200,
        customMessage: 'Task stage successfully deleted',
        type: 'TASK_STAGE_SUCCESSFULLY_DELETED'
    },
    GET_STAGE_ID_SUCCESSFULLY : {
        statusCode: 200,
        customMessage: 'Successfully find stage id',
        type: 'GET_STAGE_ID_SUCCESSFULLY'
    },
    SUCCESSFULLY_GET_ALL_CHILD : {
        statusCode: 200,
        customMessage: 'Successfully find all child',
        type: 'SUCCESSFULLY_GET_ALL_CHILD'
    },
}