const HomeAds = require('../models/HomeAds/HomeAds');
const LandAds = require('../models/LandAds/LandAds');


exports.getAllPublisherAds = (req, res, next) => {
    const publisherId = req.query.pId;
    let allAds = [];
   
    HomeAds.find()
        .then(HomeAds => {
            if(HomeAds){
                HomeAds.forEach(homeAd => {
                    if(JSON.stringify(homeAd.publisherId) === JSON.stringify(publisherId)) {
                        allAds.push(homeAd);
                    }
                })
            }
            LandAds.find()
            .then(LandAds => {
                if(LandAds) {
                    LandAds.forEach(landAd => {
                        if(JSON.stringify(landAd.publisherId) === JSON.stringify(publisherId)){
                            allAds.push(landAd);
                        }
                    })
                }
                if(allAds.length !== 0) {
                    res.status(200).json({allAds:allAds, isAdsAvailable: true});
                } else {
                    res.json({isAdsAvailable: false});
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

exports.deleteAd = (req, res, next) => {
    const adId = req.body.id;
    const adType = req.body.adType;

    if(adType === 'home') {
        HomeAds.findByIdAndDelete(adId)
        .then(result => {
            res.status(200).json({message: "success"})
        })
        .catch(error => {
            res.json({message: "failed"})
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
            
        })
    } else {
        LandAds.findByIdAndDelete(adId)
        .then(result => {
            res.status(200).json({message: "success"})
        })
        .catch(error => {
            res.json({message: "failed"});
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })
    }
}

exports.updateAd = (req, res, next) => {
    const price = req.body.price;
    const propertyDescription = req.body.propertyDescription;
    const adId = req.body.adId;
    const adType = req.body.adType;


    if(adType === 'home') {
        HomeAds.findById(adId)
        .then(result => {
            result.update({
                price:price,
                propertyDescription: propertyDescription
            })
            .then(() => {
                res.json({message: "Update Completed."})
            })
            .catch(error => {
                res.json({message: "Operation failed"});
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                return next(error);
            })
            
        })
        .catch(error => {
            res.json({message: "Operation failed"})
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })
    } else {
        LandAds.findById(adId)
        .then(result => {
            result.update({
                price:price,
                propertyDetails: propertyDescription
            })
            .then(() => {
                res.json({message: "Update Completed."})
            })
            .catch(error => {
                res.json({message: "Operation failed"});
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                return next(error);
            })
        })
        .catch(error => {
            res.json({message: "failed"})
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            return next(error);
        })
    }

}