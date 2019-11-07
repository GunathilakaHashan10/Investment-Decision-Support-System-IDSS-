const Bank = require('../models/bank/bank')

const interestRateCalculator = (amount , interestRate) => {
    return amount * interestRate / (12 * 100)
}

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
    Bank.find({},'bankId bankName description bankImage')
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


exports.postGetBankComparison = (request, response, next) => {
    const time = parseInt(request.body.time,10);
    const sortType = request.body.sortType;
    const amount = request.body.amount;

    const payload = []


    Bank.find({},'bankName interestRates')
        .then((result) => {
            const banks = result;
           
            banks.forEach((bank) => {
                const bankName = bank.bankName;
                const interestRateObj = bank.interestRates.find((interestRate) => {
                    return interestRate.time === time
                })
                let interestRate = 0;
                if(sortType === 'monthly'){
                    interestRate = interestRateObj.monthly
                }else if(sortType === 'annualy'){
                    interestRate = interestRateObj.annualy
                }else if (sortType === 'maturity') {
                    interestRate = interestRateObj.maturity
                }
                console.log(interestRate)

                if(amount){
                    interestRate = interestRateCalculator(amount,interestRate);
                }

                payload.push({
                    bankName,
                    interestRate : interestRate.toFixed(2)
                })
            })
            payload.sort((a,b) => {
                return b.interestRate-a.interestRate
            })
            response.json({
                payload
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