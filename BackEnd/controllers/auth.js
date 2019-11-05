const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const { transport } = require('./mail');

const User = require('../models/auth/User');

process.env.SECRET_KEY = 'secret';

exports.postRegisterUser = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       const error = new Error('Validation failed.');
       error.statusCode = 422;
       error.data = errors.array();
       throw error;
   }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const token = crypto.randomBytes(20).toString('hex');
    const accountType = "284695743215";

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User ({
                firstName: firstName,
                lastName:lastName,
                email: email,
                password: hashedPassword,
                verifiedEmail: false,
                verifiedToken: token,
                accountType: accountType
            });
            return user.save();
        })
        .then(result => {
            
            let mailOptions = {
                from: "rightdecision2019@gmail.com",
                to: `${email}`,
                subject: "Link to verify Email",
                text: `You are receiving this because you have to verify your email before getstarted.\n\n` +
                        `Please click the following link to verify your email ` + 
                        ` http://localhost:3000?token=${token}\n\n`
                
            }

            transport.sendMail(mailOptions)
                .then(result => {
                    console.log("Verify email sent");
                    res.status(200).json({ success: true ,emailSent: true });
                })
                .catch(error => {
                    res.json({ success: true ,emailSent: false });
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    next(error);
                })


        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
               const error = new Error('A user with this email could not be found.');
               error.statusCode = 402;
               throw error; 
            }
            loadedUser = user;
            if(user.verifiedEmail !== true) {
                console.log('User is not verified');
                return res.json({ message: 'User is not verified'});
            }
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error; 
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'somesupersecret',
                { expiresIn: '1h'}
            );
            res.status(200).json({ token: token, userId:loadedUser._id.toString(), accountType:loadedUser.accountType});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getVerifyEmail = (req, res, next) => {
    const verifyToken = req.query.verifiedToken;
   
    User.findOne({ 
        verifiedToken: verifyToken 
    })
    .then(user => {
        if (user === null) {
            res.json('email verification link is not valid');
            throw new Error('email verification link is not valid');
        } else {
            user.update({
                verifiedEmail: true
            }) 
            .then(() => {
                res.status(200).send({
                    userEmail: user.email,
                    message: 'email was verified successfully'
                });
            }) 
        }
    
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    })
};

exports.sendResetPasswordEmailLink = (req, res, next) => {
    const email = req.body.rEmail;

    User
        .findOne({ email:email})
        .then(user => {
            if(!user) {
               return res.json({ success: true , message: "The Email is not valid" }); 
                
            }
            const resetPasswordToken = crypto.randomBytes(20).toString('hex');
            user
                .update({resetPasswordToken:resetPasswordToken})
                .then(result => {
                    let mailOptions = {
                        from: "rightdecision2019@gmail.com",
                        to: `${user.email}`,
                        subject: "Link to Reset Password",
                        text: `You are receiving this because you askes to reset your password.\n\n` +
                                `Please click the following link to reset your password` + 
                                ` http://localhost:3000?resetPasswordToken=${resetPasswordToken}\n\n`
                        }

                        transport
                            .sendMail(mailOptions)
                            .then(result => {
                                console.log('Email sent');
                                res.status(200).json({ success: true , message:"Email sent successfully." });
                            })
                            .catch(error => {
                                res.json({ success: true , message: "Failed to send email" });
                                if (!error.statusCode) {
                                    error.statusCode = 500;
                                }
                                next(error);
                            })
 
                })

        })
        .catch(error => {
            res.json({ success: true ,emailSent: false });
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })
}

exports.checkResetPasswordToken = (req, res, next) => {
    const resetPasswordToken = req.query.resetPasswordToken;

    User
        .findOne({resetPasswordToken:resetPasswordToken})
        .then(user => {
            if(!user) {
                throw new Error("Token is not valid")
            }
            return res.json({userEmail: user.email});

        })
        .catch(error => {
            return next(error);
        })
}

exports.resetPassword = (req, res, next) => {
    const newPassword = req.body.newPassword;
    const userEmail = req.body.userEmail;


    User
        .findOne({ email: userEmail})
        .then(user => {
            const resetPasswordToken = crypto.randomBytes(20).toString('hex');
            bcrypt
                .hash(newPassword, 12)
                .then(hashedPassword => {
                    user
                        .update({password: hashedPassword, resetPasswordToken:resetPasswordToken })
                        .then(result => {
                            res.json({success: true, message:"Reset password successfully"});
                        })
                })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error); 
        })
}

