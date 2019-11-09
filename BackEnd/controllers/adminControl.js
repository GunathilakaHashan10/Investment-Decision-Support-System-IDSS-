const Share = require('../models/shareHandle/shareHandle');
const LandAds = require('../models/LandAds/LandAds');
const HomeAds = require('../models/HomeAds/HomeAds');
const User = require('../models/auth/User');
const Bank = require('../models/bank/bank');
const { timeParse} = require('d3-time-format');

const parseDate = timeParse("%Y-%m-%d");

function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

exports.getAdminShareDetails = (req, res, next) => {
    let shareName, startDate, endDate, dataItems, id;
    let adminShareDetailsArray = [];
    Share.find()
        .then(result => {
            result.forEach(value => {
                id = value._id;
                shareName = value.shareName;
                dataItems = value.ltp.length;    
                
                value.ltp.sort(function(a, b){return parseDate(a.date) - parseDate(b.date)}).forEach((ltpDoc, index) => {
                    if(index === 0) {
                        startDate = ltpDoc.date;
                    }

                    if(index === value.ltp.length - 1) {
                        endDate = ltpDoc.date;
                    }
                })

                const adminShareDetails = {
                    id: id,
                    shareName: shareName,
                    dataItems: dataItems,
                    startDate: startDate,
                    endDate: endDate
                }

                adminShareDetailsArray.push(adminShareDetails);
            })
            res.status(200).json(adminShareDetailsArray);           
        })
        .catch(error => {
            console.log(error);
        })
}

exports.deleteShare = (req, res, next) => {
    const id = req.query.id;

    Share.findByIdAndDelete(id)
        .then(result => {
            res.status(200).json({message: "success"})
        })
        .catch(error => {
            console.log(error);
            res.json({message: "failed"})
        })

}

exports.deleteShareData = (req, res, next) => {
    const shareID = req.body.id;
    const startDate = req.body.startDate;
    const endDate   = req.body.endDate;

    let newLtpValues = [];
    let totalCount = 0;
    let notDeletedCount = 0;
    let deletedCount = 0;

    Share.findById(shareID)
        .then(doc => {
            totalCount = doc.ltp.length;
            doc.ltp.sort(function(a, b){return parseDate(a.date) - parseDate(b.date)}).forEach((ltpDoc, index) => {
                if(!(ltpDoc.date >= convert(startDate) && ltpDoc.date <= convert(endDate))) {
                    newLtpValues.push(ltpDoc);
                    
                }
            })
            notDeletedCount = newLtpValues.length;
            deletedCount = totalCount - notDeletedCount;
            if(notDeletedCount === 0) {
                Share.findByIdAndDelete(shareID)
                    .then(result => {
                       res.json({message:"success", result:`${doc.shareName} completly deleted.`})
                    })
                    .catch(error => {
                        console.log(error);
                        res.json({message: "failed"})
                    })
            } else if(notDeletedCount > 0) {
             doc.ltp.forEach(value => {
                 Share.update(
                    {_id:shareID},
                    {$pull: {ltp: {_id: value._id}}},
                    {upsert:true},
                    function(error) {
                        if(error) {
                            console.log(error);
                        } else {
                            
                        }
                    }
                 )
            }
            )
            newLtpValues.forEach(ltpObj => {
                Share.update(
                    {_id:shareID},
                    {$push: {ltp: {$each: [ltpObj]}}},
                    {upsert:true},
                    function(error) {
                        if(error) {
                            console.log(error);
                        } else {
                            
                        }
                    }
                    )
            })

            res.json({message:"success", result:`Deleted ${deletedCount} data items.`});
        
        }
            
        })
        .catch(error => {
            console.log(error);
        })
}

exports.retriveAdvertisers = (req, res, next) => {
    
    User
        .find({isAdvertiser:true})
        .then(docs => {
            if(docs.length === 0) {
                return res.status(200).json({success: false});
            }
            return res.status(200).json({docs: docs, success:true});
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        });
}

exports.getPublisherAds = (req, res, next) => {
    const publisherId = req.query.publisherId;
    let allAds = [];
    let salesAdsCount = 0;
    let rentAdsCount = 0;
   
    HomeAds.find()
        .then(HomeAds => {
            if(HomeAds.length !== 0){
                HomeAds.forEach(homeAd => {
                    if(JSON.stringify(homeAd.publisherId) === JSON.stringify(publisherId)) {
                        allAds.push(homeAd);
                        if(homeAd.sellOrRent === "Rent") {
                            rentAdsCount = rentAdsCount + 1;
                        } else {
                            salesAdsCount = salesAdsCount + 1;
                        }
                    }
                })
            } 
            LandAds.find()
            .then(LandAds => {
                if(LandAds.length !== 0) {
                    LandAds.forEach(landAd => {
                        if(JSON.stringify(landAd.publisherId) === JSON.stringify(publisherId)){
                            allAds.push(landAd);
                            
                            salesAdsCount = salesAdsCount + 1;
                        }
                    })
                }
                if(allAds.length !== 0) {
                    res.status(200).json({allAds:allAds, salesAdsCount:salesAdsCount, rentAdsCount:rentAdsCount});
                } 
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        }) 

}

exports.controlBlockAds = (req, res, next) => {
    const adId = req.body.adId;
    const adType = req.body.adType;
    
        if(adType === "HomeSell" || adType === "HomeRent") {
            HomeAds
                .findById(adId)
                .then(dbResponse => {
                    if(!dbResponse) {
                        throw new Error("Internal error");
                    }
                    dbResponse
                        .updateOne({ isBlocked: false})
                        .then(() => {
                            res.json({success: false})
                        })
                    
                })
                .catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    return next(error);
                })
        } else {
            LandAds
                .findById(adId)
                .then(dbResponse => {
                    if(!dbResponse) {
                        throw new Error("Internal error");
                    }
                    dbResponse
                    .updateOne({ isBlocked: false})
                    .then(() => {
                        res.json({success: false})
                    })
                })
                .catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    return next(error);
                })
        }
        
}

    

exports.controlUnblockAd = (req, res, next) => {
    const adId = req.body.adId;
    const adType = req.body.adType;

        if(adType === "HomeSell" || adType === "HomeRent") {
            HomeAds
                .findById(adId)
                .then(dbResponse => {
                    if(!dbResponse) {
                        throw new Error("Internal error");
                    }
                    dbResponse
                    .updateOne({ isBlocked: true})
                    .then(() => {
                        res.json({success: true})
                    })
                })
                .catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    return next(error);
                })
        } else {
            LandAds
                .findByIdAndUpdate(adId)
                .then(dbResponse => {
                    if(!dbResponse) {
                        throw new Error("Internal error");
                    }
                    dbResponse
                    .updateOne({ isBlocked: true})
                    .then(() => {
                         res.json({success: true})
                    })
                })
                .catch(error => {
                    if (!error.statusCode) {
                        error.statusCode = 500;
                    }
                    return next(error);
                })
        }
    
}

exports.addBank = (req, res, next) => {
    const bankId = req.body.data.bankId;
    const bankName = req.body.data.bankName;
    const description = req.body.data.description;
    const interestRates = req.body.data.interestRates;

   const newBank = new Bank({
       bankName:bankName,
       bankId:bankId,
       description:description,
       interestRates:interestRates
   })

   newBank
        .save()
        .then((result) => {
            if(!result) {
                throw new Error('Internal Error');
            }
            return res.json({success:true, message: result.bankName, id:result._id})
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })
}

exports.postBankImage = (req, res, next) => {
    const id = req.body.id;
    const bankImages = req.files;
    let images = [];
    for(let i=0; i<bankImages.length; i++) {
        const image = {
            imageName:bankImages[i].filename,
            imagePath: bankImages[i].path
        }
        images.push(image);
    }

    Bank
        .findOne({bankId: id})
        .then(bank => {
            bank    
                .updateOne({bankImage:images})
                .then((result) => {
                    return res.json({success: true})
                })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })
}

exports.getAllBanks = (req, res, next) => {
    Bank
        .find()
        .then(docs => {
            if(docs.length === 0) {
                return res.status(200).json({success: false});
            }
            return res.status(200).json({docs: docs, success:true});
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        });
}

exports.updateBank = (req, res, next) => {
    const bankId = req.body.data.bankId;
    const description = req.body.data.description;
    const interestRates = req.body.data.interestRates;

    Bank
        .findById(bankId)
        .then((bank) => {
            if(!bank) {
                throw new Error('Internal Error');
            }
            bank.updateOne({
                description:description,
                interestRates:interestRates
            })
            .then((result) => {
                if(!result) {
                    throw new Error('Internal Error');
                }
                return res.json({success:true, message: result.bankName, id:result._id})
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })
}

exports.updateBankImage = (req, res, next) => {
    const id = req.body.id;
    const bankImages = req.files;
    let images = [];
    for(let i=0; i<bankImages.length; i++) {
        const image = {
            imageName:bankImages[i].filename,
            imagePath: bankImages[i].path
        }
        images.push(image);
    }

    Bank
        .findById(id)
        .then((bank) => {
            if(!bank) {
                throw new Error('Internal Error');
            }
            bank.updateOne({
                bankImage:images
            })
            .then(() => {
                return res.json({success: true})
            })
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })
}

exports.deleteBank = (req, res, next) => {
    const bankId = req.query.bankId;

    Bank
        .findByIdAndDelete(bankId)
        .then((result) => {
            if(!result) {
                throw new Error('Internal error')
            }
            return res.status(200).json({message: "success"})
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })

}

exports.getAllUsers = (req, res, next) => {
    User
        .find()
        .then((users) => {
            if(users.length === 0) {
                return res.json({success: false})
            }

            return res.json({userData:users, success: true})
        })
        .catch((error) => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })
}

exports.deleteUser = (req, res, next) => {
    const userId = req.query.userId;

    User
        .findByIdAndDelete(userId)
        .then((result) => {
            if(!result) {
                throw new Error('Internal error')
            }
            return res.status(200).json({message: "success"})
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })
}
