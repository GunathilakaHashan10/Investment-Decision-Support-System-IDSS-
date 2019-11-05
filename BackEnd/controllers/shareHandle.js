const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const { timeParse} = require('d3-time-format');
 
const Share = require('../models/shareHandle/shareHandle');
const Ltp = require('../models/Ltp/Ltp');
const ShareValue = require('../testModels/Share');

const parseDate = timeParse("%Y-%m-%d");

exports.postAddShare = (req, res, next) => {
    if(!req.files) {
        const error = new Error('No tsv file provided.');
        error.statusCode = 422;
        throw error;
    }

    const shareName = req.body.shareName;
    const shareTag = req.body.shareTag;
    const duration = req.body.duration;
    const file = req.files;
    let filePath, fileName = null


    for(let i=0; i<file.length; i++){
        filePath = file[i].path;
        fileName = file[i].filename;
    }

    
    const results = [];

    Share.findOne({shareName: shareName })
            .then(shareDoc => {
                if(!shareDoc) { 
                    const share = new Share({
                        shareName: shareName,
                        shareTag: shareTag,
                        duration: duration,
                        filePath: filePath,
                        fileName: fileName 
                    })

                    share.save()
                        .then(result => {
                            if(result) {
                                const filePath = path.join('/home','/hashan', '/Testing in server', '/temp_server', '/public', '/tsvFiles', result.fileName);
                                fs.createReadStream(filePath)
                                .pipe(csv()) /*{ separator: '\t' }*/
                                .on('data', (data) => results.push(data))
                                .on('end', () => {
                                    results.map(value => {
                                        const ltpObject = {
                                            date: value.date,
                                            open: value.open,
                                            high: value.high,
                                            low: value.low,
                                            close: value.close,
                                            adjClose: value.adjClose,
                                            volume: value.volume
                                         }
                                         Share.findOne({shareName: result.shareName })
                                                .then(resultDoc => {
                                                    resultDoc.ltp.push(ltpObject);
                                                    resultDoc.save();
                                                })
                                                .catch(error => {
                                                    console.log(error);
                                                })
                                              
                                    })
                                }); 
                            }
                            res.status(201).json({message: 'Share added successfully!'});
                        })
                } else if (shareDoc) {
                    shareDoc.updateOne({
                        filePath: filePath,
                        fileName: fileName 
                    })
                    .then(resultDoc => {
                        if(resultDoc) {
                            Share.findOne({shareName: shareName }) 
                                .then(UpdatedShare => {
                                    const newLtp = [];
                                    const filePath = path.join('/home','/hashan', '/project', '/server', '/public', UpdatedShare.fileName);
                                    fs.createReadStream(filePath)
                                    .pipe(csv({ separator: '\t' }))
                                    .on('data', (data) => results.push(data))
                                    .on('end', () => {
                                        results.map(value => {
                                            const ltpObject = {
                                                date: value.date,
                                                open: value.open,
                                                high: value.high,
                                                low: value.low,
                                                close: value.close,
                                                volume: value.volume
                                            }
                                            newLtp.push(ltpObject);

                                            Share.update(
                                                {shareName: shareName},
                                                {$push: {ltp: {$each: [ltpObject]}}},
                                                {upsert:true},
                                                function(error) {
                                                    if(error) {
                                                        console.log(error);
                                                    } else {
                                                        
                                                    }
                                                }
                                                )
                                    })
                    
                                });
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.json({
                                        message: 'Error'
                                    });
                                    if(!err.statusCode) {
                                        err.statusCode = 500;
                                    }
                                    next(err);
                                }) 
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.json({
                            message: 'Error'
                        });
                        if(!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    })
                }


            })
            .catch(error => {
                res.json({
                    message: 'Error'
                });
                if(!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });

}

exports.getShares = (req, res, next) => {
    const company = [];
    Share.find()
        .then(doc => {
            if (!doc) {
                return console.log('Share do not exits!');
            }
            doc.forEach(value => {
                const shareDetails = {
                    shareId: value._id,
                    shareName: value.shareName
                }
                company.push(shareDetails);
            })
            res.status(200).json(company);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getShareFile = (req, res, next) => {
    const id = req.query.id;

    Share.findById(id)
        .then(share => {
            res.status(200).json({result: share.ltp})
            
        }) 
        .catch(error => {
            console.log(error);
        })

}

exports.getSlope = (req, res, next) => {
    const xStart = req.body.xStart;
    const xEnd = req.body.xEnd;

    let deltaX = Math.abs(parseInt(xStart, 10) - parseInt(xEnd, 10));
    let slopeOfShares = []; 
    

    Share.find()
        .then(result => {
            result.map(valueArray => {
                let startHigh = null;
                let endHigh = null;
                valueArray.ltp.sort(function(a, b){return parseDate(a.date) - parseDate(b.date)}).map((value, index) => {
                    if(index === parseInt(xStart, 10)) {
                        startHigh = value.high;
                    } 
                    if(index == parseInt(xEnd, 10)) {
                        endHigh = value.high;
                    }
                    

                })
                if(startHigh > 0 && endHigh > 0 ) {
                        
                    let deltaY = Math.abs(startHigh - endHigh);
                    let slope = (deltaX / deltaY).toFixed(2);

                    const slopeAndShare = {
                        shareName: valueArray.shareName,
                        slope: slope
                    }

                    slopeOfShares.push(slopeAndShare);
                }
            })
            // console.log(slopeOfShares);
            res.status(200).json(slopeOfShares);
             
        })
        .catch(error => {
            console.log(error);
            res.json(error);
        })
}

exports.getLtp = (req, res, next) => {
   ShareValue.findOne({share: 'tesla'})
        .then(result => {
            res.status(200).json({result: result.ltp});
            console.log(result);
            
        })
        .catch(error => {
            console.log(error);
        })
}

// exports.getLtp = (req, res, next) => {
//     Ltp.find().sort({'_id': -1})
//         .then(result => {
//             res.status(200).json({result});
//         })
//         .catch(error => {
//             console.log(error);
//         })
// }

// exports.postAddShare = (req, res, next) => {
//     if(!req.file) {
//         const error = new Error('No tsv file provided.');
//         error.statusCode = 422;
//         throw error;
//     }

//     const shareName = req.body.shareName;
//     const shareTag = req.body.shareTag;
//     const duration = req.body.duration;
//     const filePath = req.file.path;
//     const fileName = req.file.filename;
    
//     const share = new Share({
//         shareName: shareName,
//         shareTag: shareTag,
//         duration: duration,
//         filePath: filePath,
//         fileName: fileName
//     });
//     share
//         .save()
//         .then(result => {
//             res.status(201).json({
//                 message: 'Share added successfully!',
//                 share: result
//             });
//         })
//         .catch(err => {
//             res.json({
//                 message: 'Error'
//             });
//             if(!err.statusCode) {
//                 err.statusCode = 500;
//             }
//             next(err);
//         })
// }


// exports.getShareFile = (req, res, next) => {
//     const id = req.query.id;

//     Share.findById(id)
//         .then(share => {
//             if (!share) {
//                 return console.log('Share does not exits');
//             }
//             const fileName = share.fileName;
//             const filePath = path.join('/home','/hashan', '/project', '/server', '/public', fileName);
//             res.sendFile(filePath);
            
//         }) 

// }




