const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const Ltp = require('../models/Ltp/Ltp');
const Share = require('../testModels/Share');


const filepath = path.join('/home','/hashan','/project','/server','/csvParser','MSFT.tsv');


exports.postLtp = (req, res, next) => {
    const results = [];

    fs.createReadStream(filepath)
    .pipe(csv({ separator: '\t' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        results.map(value => {
                const ltp = new Ltp({
                    date: value.date,
                    open: value.open,
                    high: value.high,
                    low: value.low,
                    close: value.close,
                    volume: value.volume
                })
                ltp.save()
                .then(result => {
                    res.status(200).json({message: "Ltp Added sucessfully!"});
                })
                .catch(error => {
                    console.log(error);
                });  
        })
    });  
}

exports.addLtp = (req, res, next) => {
    const shareName = req.body.share;
    const results = [];

    const share = new Share({
        share: shareName,
        
    })
    share.save()
        .then(result => {
            console.log(result);
            res.status(200).json({message: "Ltp Added sucessfully!"});
        })
        .catch(error => {
            console.log(error);
        });

    fs.createReadStream(filepath)
    .pipe(csv({ separator: '\t' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
         results.map(value => {
             const obj = {
                date: value.date,
                open: value.open,
                high: value.high,
                low: value.low,
                close: value.close,
                volume: value.volume
             }
             console.log(obj);
            
            Share.findOne({share: shareName })
                .then(result => {
                    result.ltp.push(obj);
                    result.save();
                })
                .catch(error => {
                    console.log(error);
                })
         })
    })
}





