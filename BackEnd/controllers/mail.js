const nodemailer = require('nodemailer');

exports.transport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: "rightdecision2019@gmail.com",
        pass: "vtgl qqoq vmcw skdx"
    }
});


// cupu dwth koqj vnsb