const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const userController = require('./userController');

// GET USER ID
router.get('/userId', userController.getUserId);

// USER SIGN UP
router.post('/signup', userController.signup);

// USER LOGIN
router.post('/login', userController.login);

// LOGIN AUTHENTICATION
router.get('/dashboard', authMiddleware, userController.dashboard);

// ADD USER
router.post('/addUser', userController.addUser);

// EDIT USER
router.post('/edit/:id', userController.editUser);

// DELETE USER
router.post('/delete/:id', userController.deleteUser);

// GET USERS
router.get('/getUsers', userController.getUsers);

router.get('/token', userController.getToken);

module.exports = router;
