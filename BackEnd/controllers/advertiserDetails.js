const User = require('../models/auth/User');

exports.registerAdvertiser = (req, res, next) => {
    let companyName = null;
    if(req.body.companyName != null) {
        companyName = req.body.companyName;
    }
    let contactNo = req.body.contactNo;
    let address = req.body.address;
    let uId = req.body.userId;

    User.findById(uId)
        .then(result => {
            result.update({
                company: companyName,
                contactMe: contactNo,
                address: address,
                isAdvertiser: true
            })
            .then(() => {
                res.json({message: "You have successfully registered as a advertiser"});
            })
            .catch(error => {
                res.json({message: "Operation failed"});
                console.log(error);
            })
        })
        .catch(error => {
            console.log(error);
        })
}

exports.checkIsAdvertiser = (req, res, next) => {
    const userId = req.query.id;

    User.findById(userId)
        .then(user => {
            res.json({isAdvertiser: user.isAdvertiser});
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getAdvertiserDetails = (req, res, next) => {
    const pId = req.query.pId;

    User.findById(pId)
        .then(user => {
            res.json({ publisher: user });
        })
        .catch(error => {
            console.log(error);
        })
}