const HomeAds = require('../models/HomeAds/HomeAds');
const LandAds = require('../models/LandAds/LandAds');

exports.postPublishHomeAd = (req, res, next) => {

    const publisherId = req.body.userId;
    const propertyType = req.body.propertyType; 
    const sellOrRent = req.body.sellOrRent;
    const location = req.body.location;
    const price = req.body.price;
    const bedRooms = req.body.bedRooms;
    const bathRooms = req.body.bathRooms;
    const floors = req.body.floors;
    const parkingSpace = req.body.parkingSpace;
    const landSize = req.body.landSize;
    const AC = req.body.AC;
    const hotWater = req.body.hotWater;
    const mainLineWater = req.body.mainLineWater;
    const overHeadWater = req.body.overHeadWater;
    const serventRoom = req.body.serventRoom;
    const serventToilet = req.body.serventToilet;
    const propertyDescription = req.body.propertyDescription;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const homeImages = req.files;
  

    let adsImages = [];
    for(let i=0; i<homeImages.length; i++){
        let image = {
            imageName: homeImages[i].filename,
            imagePath: homeImages[i].path
        }
        adsImages.push(image);   
    }

    const newAd = new HomeAds({
        publishTime: new Date(),
        publisherId: publisherId,
        propertyType: propertyType,
        sellOrRent: sellOrRent,
        location: location,
        longitude: longitude,
        latitude:latitude,
        price: price,
        bedRooms: bedRooms,
        bathRooms: bathRooms,
        floors: floors,
        parkingSpace: parkingSpace,
        landSize: landSize,
        AC: AC,
        hotWater: hotWater,
        mainLineWater: mainLineWater,
        overHeadWater: overHeadWater,
        serventRoom: serventRoom,
        serventToilet: serventToilet,
        propertyDescription: propertyDescription,
        homeImages: adsImages
    });

    newAd.save()
        .then(result => {
            if(result) {
                res.status(200).json({message: "Your advertisement was Published successfully"});
            } else {
                res.json({message: "Error"});
            }
        })
        .catch(error => {
            console.log(error);
        })
}

exports.postPublishLandAd = (req, res, next) => {
    const publisherId = req.body.userId;
    const landType = req.body.landType;
    const location = req.body.location;
    const price = req.body.price;
    const areaOfLand = req.body.areaOfLand;
    const propertyDetails = req.body.propertyDetails;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const receivedImages = req.files;


    let landImages = [];
    for(let i=0; i<receivedImages.length; i++) {
        let image = {
            imageName: receivedImages[i].filename,
            imagePath: receivedImages[i].path
        }
        landImages.push(image); 
    }

    const newLandAd = new LandAds({
        publishTime: new Date(),
        publisherId: publisherId,
        landType: landType,
        location: location,
        longitude: longitude,
        latitude:latitude,
        price: price,
        areaOfLand: areaOfLand,
        propertyDetails: propertyDetails,
        landImages: landImages
    })

    newLandAd.save()
        .then(result => {
            if(result) {
                res.status(200).json({message: "Your advertisement was Published successfully"});
            } else {
                res.json({message: "Error"});
            }
        })
        .catch(error => {
            console.log(error);
        })
}