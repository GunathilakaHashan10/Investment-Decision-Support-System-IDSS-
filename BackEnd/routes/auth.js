const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const User = require('../models/auth/User');
const authController = require('../controllers/auth');

router.post('/sign-up',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                return User.findOne({ email: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5}),
        body('firstName')
            .trim()
            .not()
            .isEmpty(),
        body('lastName')
            .trim()
            .not()
            .isEmpty()

    ], 
    authController.postRegisterUser
);

router.post('/login', authController.postLogin);

router.get('/verifyEmail', authController.getVerifyEmail);

router.post('/resetPassword', authController.sendResetPasswordEmailLink);

router.get('/verifyResetPassword', authController.checkResetPasswordToken);

router.post('/resetNewPassword', authController.resetPassword);

module.exports  = router;