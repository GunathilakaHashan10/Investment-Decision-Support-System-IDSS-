const HomeAds = require('../models/HomeAds/HomeAds');
const LandAds = require('../models/LandAds/LandAds');

exports.getHomeAdsSell = (req, res, next) => {
    const homeType = req.query.type;

    let homeAdsSell = [];
    HomeAds.find()
        .then(homeAds => {
            if(homeAds) {
                homeAds.forEach(homeAd => {
                    if(homeAd.sellOrRent === "Sell" && homeAd.propertyType === homeType) {
                        homeAdsSell.push(homeAd);
                    }
                })
                if(homeAdsSell.length === 0) {
                    return res.status(200).json(null);
                } else {
                    return res.status(200).json(homeAdsSell);
                }
                
            }

            return res.json({error: "No home ads for sell"});
        })
        .catch(error => {
            console.log(error);
        })
}



exports.getHomeAdsRent = (req, res, next) => {
    const homeType = req.query.type;

    let homeAdsRent = [];
    HomeAds.find()
        .then(homeAds => {
            if(homeAds) {
                homeAds.forEach(homeAd => {
                    if(homeAd.sellOrRent === "Rent" && homeAd.propertyType === homeType) {
                        homeAdsRent.push(homeAd);
                    }
                })
                if(homeAdsRent.length === 0) {
                    return res.status(200).json(null);
                } else {
                    return res.status(200).json(homeAdsRent);
                }
                
            }

            return res.json({error: "No home ads for rent"});
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getLandAds = (req, res, next) => {
    const landType = req.query.type;

    let landAds = [];
    LandAds.find()
        .then(results => {
            if(results) {
                results.forEach(landAd => {
                    if(landAd.landType === landType) {
                        landAds.push(landAd);
                    } 
                })
                if(landAds.length === 0) {
                    return res.status(200).json(null);
                } else {
                    return res.status(200).json(landAds);
                }
              
            }
        })
        .catch(error => {
            console.log(error);
        })
}

