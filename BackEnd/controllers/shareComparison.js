const Share = require('../models/shareHandle/shareHandle');
const { timeParse} = require('d3-time-format');

const parseDate = timeParse("%Y-%m-%d");

function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

exports.getSlopeResults = (req, res, next) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const priceType = req.body.priceType;

    let slopeOfShares = []; 

    const date1 = new Date(convert(startDate));
    const date2 = new Date(convert(endDate));
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    let deltaX = diffDays;

    Share.find()
        .then(result => {
            result.map(valueArray => {
                let startLtp = null;
                let endLtp = null;
                valueArray.ltp.map((value, index) => {
                    if(convert(startDate) === value.date){
                       switch(priceType) {
                           case "open":
                               startLtp = value.open;
                               break;
                            case "close":
                                startLtp = value.close;
                                break;
                            case "high":
                                startLtp = value.high;
                                break;
                            case "low":
                                startLtp = value.low;
                                break;
                            default: 
                                break;
                       }
                    } 

                    if(convert(endDate) === value.date){
                        switch(priceType) {
                            case "open":
                                endLtp = value.open;
                                break;
                             case "close":
                                endLtp = value.close;
                                 break;
                             case "high":
                                endLtp = value.high;
                                 break;
                             case "low":
                                endLtp = value.low;
                                 break;
                             default: 
                                 break;
                        }
                     }

                })
                let deltaY = Math.abs(endLtp - startLtp);
                let slope = ((deltaY / deltaX).toFixed(4)*1000);

                const slopeAndShare = {
                    shareName: valueArray.shareName,
                    slope: slope
                }

                slopeOfShares.push(slopeAndShare);

            })
            res.status(200).json(slopeOfShares);
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getDate = (req, res, next) => {
    let startDate;
    let endDate;

    Share.find()
        .then(result => {
            result[0].ltp.sort(function(a, b){return parseDate(a.date) - parseDate(b.date)}).map((value, index) => {
                if(index === 0){
                    startDate = value.date;
                }
                if(index === result[0].ltp.length - 1){
                    endDate = value.date;
                }
            })

            res.status(200).json({startDate: startDate, endDate: endDate});
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getExpectedReturnForOneShare = (req, res, next) => {
    const shareId = req.body.shareId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const investmentAmount = req.body.investmentAmount;

    const startDateStr = convert(startDate);
    const endDateStr = convert(endDate);

    const startDate_year  = new Date(startDateStr).getFullYear();
    const startDate_month = new Date(startDateStr).getMonth();
    const startDate_date  = new Date(startDateStr).getDate();
    const expectedReturnStartDate = new Date(startDate_year - 1, startDate_month, startDate_date);

    const endDate_year  = new Date(endDateStr).getFullYear();
    const endDate_month = new Date(endDateStr).getMonth();
    const endDate_date  = new Date(endDateStr).getDate();
    const expectedReturnEndDate  = new Date(endDate_year - 1, endDate_month, endDate_date);

    const date1 = new Date(convert(expectedReturnStartDate));
    const date2 = new Date(convert(expectedReturnEndDate));
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    let deltaX = diffDays;

    Share.findById(shareId)
        .then(share => {
            let startCloseLtp = null;
            let endCloseLtp = null;
            share.ltp.map(value => {
                if(value.date === convert(expectedReturnStartDate)) {
                    startCloseLtp = value.close;
                }

                if(value.date === convert(expectedReturnEndDate)) {
                    endCloseLtp = value.close;
                }
            })

            if(startCloseLtp === null ) {
                return res.json({ startDateError: "startDate is not valid"});
            }
            if(endCloseLtp === null ) {
                return res.json({ endDateError: "endDate is not valid"});
            }

            let deltaY = Math.abs(endCloseLtp - startCloseLtp);
            let slope = (deltaY / deltaX).toFixed(5);
            let expectedReturn = slope * investmentAmount;


            res.status(200).json({share: share.shareName , expectedReturn: expectedReturn});
        })
        .catch(error => {
            console.log(error);
        });
    
    
    
}

exports.getExpectedReturnForAllShare = (req, res, next) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const investmentAmount = req.body.investmentAmount;

    let expectedReturnAndShare = [];

    const startDateStr = convert(startDate);
    const endDateStr = convert(endDate);

    const startDate_year  = new Date(startDateStr).getFullYear();
    const startDate_month = new Date(startDateStr).getMonth();
    const startDate_date  = new Date(startDateStr).getDate();
    const expectedReturnStartDate = new Date(startDate_year - 1, startDate_month, startDate_date);

    const endDate_year  = new Date(endDateStr).getFullYear();
    const endDate_month = new Date(endDateStr).getMonth();
    const endDate_date  = new Date(endDateStr).getDate();
    const expectedReturnEndDate  = new Date(endDate_year - 1, endDate_month, endDate_date);

    const date1 = new Date(convert(expectedReturnStartDate));
    const date2 = new Date(convert(expectedReturnEndDate));
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    let deltaX = diffDays;

    Share.find()
    .then(shares => {
        shares.map(valueArray => {
            let startCloseLtp = null;
            let endCloseLtp = null;
            valueArray.ltp.map((value, index) => {
                if(value.date === convert(expectedReturnStartDate)) {
                    startCloseLtp = value.close;
                }

                if(value.date === convert(expectedReturnEndDate)) {
                    endCloseLtp = value.close;
                }
            })

            if(startCloseLtp === null ) {
                return res.json({ startDateError: "startDate is not valid"});
            }
            if(endCloseLtp === null ) {
                return res.json({ endDateError: "endDate is not valid"});
            }

            let deltaY = Math.abs(endCloseLtp - startCloseLtp);
            let slope = (deltaY / deltaX).toFixed(5);
            let expectedReturn = slope * investmentAmount;

            expectedReturnAndShare.push({share:valueArray.shareName ,expectedReturn:expectedReturn});
        })
        res.status(200).json(expectedReturnAndShare);
    })
    .catch(error => {
        console.log(error);
    })
    
}