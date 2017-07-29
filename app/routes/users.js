var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var userValidator = require('../validator/users');
var adminValidator = require('../validator/checkadmin');

router.post('/signup',userValidator.signUpValidation,userController.signUp);
router.post('/login',userValidator.loginValidation,userController.login);
router.post('/alluser',userValidator.allUserValidation,adminValidator.IsAdmin,userController.allUser);
router.post('/logout',userController.logout);

module.exports = router;
