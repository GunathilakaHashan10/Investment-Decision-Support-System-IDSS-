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

    Bank.findOne({bankId}, 'interestRates bankName')
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

exports.postGetAllBanksName_Id = (request, response, next) => {
    Bank.find({},'bankId bankName')
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

exports.postGetAbsoluteReturnChatValues = (request, response, next) => {
    const depositTime = parseInt(request.body.depositTime,10);
    const depositAmount = parseFloat(request.body.depositAmount)
    const bankId = request.body.bankId
    const Term = request.body.Term.split(' ')

    Bank.findOne({bankId}, 'bankName interestRates')
        .then((result) => {
            const { interestRates, bankName}  = result;
            
            const interestRateObj = interestRates.find((interestRate) => interestRate.time === parseInt(Term[0]))
            const chartData = [];
            let totalInterest = 0;
            let totalAmount = depositAmount;
            let i;
            chartData.push({
                x: 0,
                y: 0
            })
            if(Term[1] === 'monthly') {
                const interestRate = interestRateObj.monthly;
                for(i = 1 ; i <= depositTime; i++){
                    const interest = totalAmount * interestRate / (100 * 12)
                    totalInterest += interest;
                    totalAmount += interest;
                    chartData.push({
                        x: i,
                        y: totalInterest.toFixed(2)
                    })
                }
            } else if (Term[1] === 'annualy') {
                const interestRate = interestRateObj.annualy;
                for(i = 1 ; i <= Math.round(depositTime/12); i++){
                    const interest = totalAmount * interestRate / (100)
                    totalInterest += interest;
                    totalAmount += interest;
                    chartData.push({
                        x: i*12,
                        y: totalInterest.toFixed(2)
                    })
                }
            } else if (Term[1] === 'maturity') {
                const interestRate = interestRateObj.maturity;
                for(i = 1 ; i <= Math.round(depositTime/Term[0]); i++){
                    const interest = totalAmount * interestRate * Term[0] / (100 * 12)
                    totalInterest += interest;
                    totalAmount += interest; 
                    chartData.push({
                        x: i*Term[0],
                        y: totalInterest.toFixed(2)
                    })
                }
            }
            const payload = {
                chartData,
                totalAmount,
                totalInterest,
                bankName
            }
           
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