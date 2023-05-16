const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

//****************************************************
//----------------Fix for deprecation-----------------
const { checkReturnTo } = require('../middleware');
//----------------------------------------------------
//****************************************************

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));


router.route('/login')
    .get(users.renderLogin)
    //*******************************************************************************************************
    //--Colt's code has deprecation, Fix implemented here & in controllers(checkReturnto middleware added)---
    .post(checkReturnTo,
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        users.login);
//-------------------------------------------------------------------------------------------------------
//*******************************************************************************************************

router.get('/logout', users.logout);

module.exports = router;