const Share = require('../models/shareHandle/shareHandle');
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