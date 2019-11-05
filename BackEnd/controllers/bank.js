const Bank = require('../models/bank/bank')

exports.postAddBank = (request, response, next) => {
    
    const bankName = request.body.bankName;
    const bankId = request.body.bankId;
    const description = request.body.description;
    const interestRates = request.body.interestRates;
    const time = request.body.time;
    
    const bank = new Bank({
        bankName: bankName,
        bankId: bankId,
        interestRates: interestRates,
        description: description,
        time: time
    });

    bank.save()
        .then((result) => {
            response.json({
                payload: result
            })
        })
        .catch((e) => {
            console.log(e);
            response.json({error: e});
        })
}

// get bank's id, name and description
exports.postGetAllBanks = (request, response, next) => {
    Bank.find({},'bankId bankName description')
        .then((result) => {
            response.json({
                payload: result
            })
        })
        .catch((e) => {
            console.log(e);
            response.json({error: e});
        })
}

exports.postUpdateBank = (request, response, next) => {
    const bankId = request.body.bankId;
    const updatedBank = request.body.updatedBank;

    Bank.findOneAndUpdate({bankId}, updatedBank)
        .then((result) => {
            response.json({
                payload: result
            })
        })
        .catch((e) => {
            console.log(e);
            response.json({error: e});
        })
}

exports.postDeleteBank = (request, response, next) => {
    const bankId = request.body.bankId;

    Bank.findOneAndDelete({bankId})
        .then((result) => {
            response.json({
                payload: result
            })
        })
        .catch((e) => {
            console.log(e);
            response.json({error: e});
        })
}

exports.postGetSpecificBank = (request, response, next) => {
    const bankId = request.query.id;

    Bank.findOne({bankId})
        .then((result) => {
            response.json({
                payload: result
            })
        })
        .catch((e) => {
            console.log(e);
            response.json({error: e});
        })
}

exports.postGetSpecificBankInterestRates = (request, response, next) => {
    const bankId = request.query.id;

    Bank.findOne({bankId}, 'interestRates')
        .then((result) => {
            response.json({
                payload: result
            })
        })
        .catch((e) => {
            console.log(e);
            response.json({error: e});
        })
}

// exports.postGetAllBanks = (request, response, next) => {
//     Bank.find()
//         .then((result) => {
//             response.json({
//                 payload: result
//             })
//         })
//         .catch((e) => {
//             console.log(e);
//             response.json({error: e});
//         })
// }