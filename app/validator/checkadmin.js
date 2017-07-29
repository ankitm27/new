const resp = require('../config/responseMessage')
const universalfunction = require('../utils/middlewareFunction')
const User = require('../models/users');
const logger = require('../utils/logging');

exports.IsAdmin = IsAdmin;
exports.loginOrNot = loginOrNot;


function IsAdmin(req,res,next){
 var user_id = req.body.user_id;
 User.count({"_id":user_id,"user_type":1},function(err,result){
     if(err){
         universalfunction.sendError(resp.ERROR.ERROR_IN_QUERY,res);
     }else if(result==1){
        next();
     }else{
         universalfunction.sendError(resp.ERROR.NEED_ADMIN_USER_PRIVILIAGE,res)
     }
 })   
}



function loginOrNot(req,res,next){
    if(req.session.user_id){
        console.log("login correct");
        next();
    }else{
        console.log("login error");
        universalfunction.sendError(resp.ERROR.LOGIN_FIRST,res);
    }
}