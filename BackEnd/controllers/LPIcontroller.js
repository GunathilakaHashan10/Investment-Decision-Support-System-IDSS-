const LPI = require('../models/LPI/LPI');

exports.sendLPIvalue = (req, res, next) => {
    const lpiType = req.body.LPI;
    let totalLPI = 0;
    let lpiCount = 0;

    if (lpiType === "average") {
        LPI
            .find()
            .then((values) => {
                if(values.length === 0){
                    throw new Error('Collection is empty')
                }

                values.forEach((value, index) => {
                    if(value.LPI_1 !== 0) {
                        totalLPI = totalLPI + value.LPI_1;
                        lpiCount++;
                    }

                    if(value.LPI_2 !== 0) {
                        totalLPI = totalLPI + value.LPI_2;
                        lpiCount++;
                    }
                })

                let averageLPI = totalLPI / lpiCount;
                res.json({LPIvalue: averageLPI})
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                return next(error);
            })
    } else {
        LPI
            .find()
            .then((values) => {
                if(values.length === 0){
                    throw new Error('Collection is empty')
                }

                let latestLPI = 0;

                if(values[values.length - 1].LPI_2 === 0) {
                    latestLPI = values[values.length - 1].LPI_1;
                } else {
                    latestLPI = values[values.length - 1].LPI_2;
                }

                res.json({LPIvalue: latestLPI})

            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                return next(error);
            })
    }

}