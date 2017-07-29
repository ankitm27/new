const resp = require('../config/responseMessage')
const universalfunction = require('../utils/middlewareFunction')
const Joi = require('joi');
const logger = require('../utils/logging');

exports.signUpValidation = signUpValidation;
exports.allUserValidation = allUserValidation;
exports.loginValidation = loginValidation;

function signUpValidation(req, res, next) {
    var user_name = req.body.user_name;
    var email = req.body.email;
    var password = req.body.password;
    var user_type = req.body.user_type ? req.body.user_type : 2;

    const schema = Joi.object().keys({
        user_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        user_type: Joi.number().integer().min(1).max(2).required()
    })
    Joi.validate({ user_name: user_name, email: email, password: password, user_type: user_type }, schema, function (err, result) {
        if (err) {
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        } else {
            next();
        }

    })

}



function allUserValidation(req, res, next) {
    var user_id = req.body.user_id;
    const schema = Joi.object().keys({
        user_id: Joi.string().required(),
    })
    Joi.validate({user_id:user_id},schema,function(err,result){
        if(err){
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        }else{
            next();    
        }
})
}



function loginValidation(req,res,next){
    var user_name = req.body.user_name;
    var password = req.body.password;
    const schema = Joi.object().keys({
        user_name: Joi.string().required(),
        password: Joi.string().required()    
})
    Joi.validate({user_name:user_name,password:password},schema,function(err,result){
        if(err){
            console.log("check");
            universalfunction.sendError(resp.ERROR.FIELD_VALIDATION_FAILED, res)
        }else{
            next();    
        }
    })
}





