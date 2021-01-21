const express = require('express');
const router = express.Router();
const passport=require('passport');

const usersController = require('../controllers/users_controller');
router.get('/profile',passport.checkAuthentication,usersController.profile);
//here basically we gave address of pages using / and also called as action
//then we append/connect those action to specific controller modules function which we have return in controllers
router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out',usersController.destroySession)
module.exports = router;