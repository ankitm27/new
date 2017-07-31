const User = require('../models/users');
const async = require('async');
const resp = require('../config/responseMessage')
const universalfunction = require('../utils/middlewareFunction')
const bcrypt = require('bcrypt-nodejs')
const userType = require('../config/parameter')
const logger = require('../utils/logging');


exports.signUp = signUp;
exports.login = login;
exports.allUser = allUser;
exports.logout = logout;

function signUp(req, res) {
	var user_name = req.body.user_name;
	var email = req.body.email;
	var password = req.body.password;
	var user_type = req.body.user_type ? req.body.user_type : 2;
	async.auto({
		checkUserPresentOrNot: function (cb) {
			User.count({ 'user_name': user_name }, function (err, userCount) {
				if (err) {
					logger.trace("there is some error in this particular query",err);
					cb(resp.ERROR.ERROR_IN_QUERY);
				} else if (userCount == 1) {
					logger.trace("User with same user name is present",user_name);
					cb(resp.ERROR.USER_ALREADY_REGISTERED);
				} else {
					logger.trace("User with same user name is not present ",user_name);
					cb(null, user_name);
				}

			})
		},
		savedUserRaw: ['checkUserPresentOrNot', function (result, cb) {
			let hash_password = bcrypt.hashSync(password);
			var raw = new User({
				user_name: user_name,
				email: email,
				password: hash_password,
				user_type: user_type
			});
			raw.save(function (err, result) {
				if (err) {
					cb(err);
				} else {
					cb(null, result);
				}
			})
		}]

	}, function (err, result) {
		if (err) {
			logger.trace("there is some error in sign up",err);
			universalfunction.sendError(err, res);
		} else {
			logger.trace("successfully sign up",err);
			universalfunction.sendSuccess(resp.SUCCESS.REGISTERED, null, res);
		}
	})
}

function login(req, res) {
	var user_name = req.body.user_name;
	var password = req.body.password;
	async.auto({
		checkUserNameAndPasswordIsValid: function (cb) {
			User.find({ 'user_name': user_name }, function (err, result) {
				if (err) {
					logger.trace("there is some problem in login ",err);
					cb(err);
				} else {
					if (result.length == 1) {
						let hash_password = result[0].password;
						if (bcrypt.compareSync(password, hash_password)) {
							console.log("login successfully");
							let user_type = userType.userType[result[0].user_type];
							let userData = {
								user_id: result[0]._id,
								user_name: result[0].user_name,
								email: result[0].email,
								user_type: user_type
							}
							req.session.user_id = result[0]._id;
							req.session.user_type = result[0].user_type;
							console.log(req.session.user_type);
							logger.trace("login successfully",err);
							cb(null, userData);
						} else {
							logger.trace("password not matched",result);
							cb(resp.ERROR.INVALID_CREDENTIALS);
						}
					} else {
						logger.trace("user name not present",result);
						cb(resp.ERROR.INVALID_USERNAME);
					}
				}
			})
		}
	}, function (err, result) {
		if (err) {
			logger.trace("there is some problem in login",err);
			universalfunction.sendError(err, res);
		} else {
			logger.trace("login successfully",result);
			universalfunction.sendSuccess(resp.SUCCESS.LOGGED_IN, result.checkUserNameAndPasswordIsValid, res);
		}
	})
}

function logout(req, res) {
	console.log(req.session.user_type);
	if (req.session.user_id) {
		// console.log(req.session.user_id);
		req.session.destroy();
		logger.trace("successfully logout",1)
		universalfunction.sendError(resp.SUCCESS.LOGOUT_SUCCESSFULLY, res);
    } else {
		logger.trace("there is some problem in logout",1);
		universalfunction.sendError(resp.ERROR.LOGIN_FIRST, res);
	}
}


function allUser(req, res) {
	async.series({
		getAllUserDetails: function (cb) {
			User.find({ "user_type": 2 }, { "_id": 1, "user_name": 1 }, function (err, result) {
				if (err) {
					logger.trace("there is some problem to find user details",err);
					cb(resp.ERROR.USER_NOT_FOUND);
				} else {
					logger.trace("user details fetch successfully",result);
					cb(err, result);
				}
			})
		},

	}, function (err, result) {
		if (err) {
			logger.trace("there is some problem to find user details",err);
			universalfunction.sendError(err, res);
		} else {
			logger.trace("user details fetch successfully",result);
			universalfunction.sendSuccess(resp.SUCCESS.USER_FOUND, result.getAllUserDetails, res);
		}
	})
}