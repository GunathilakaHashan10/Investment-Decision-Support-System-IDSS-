const path = require('path');
const Index = require('../models/IndexHandle/IndexHandle');

exports.postAddIndex = (req, res, next) => {
    if(!req.file) {
        const error = new Error('No tsv file provided.');
        error.statusCode = 422;
        throw error;
    }

    const indexName = req.body.indexName;
    const indexTag = req.body.indexTag;
    const duration = req.body.duration;
    const filePath = req.file.path;
    const fileName = req.file.filename;

    console.log(fileName);


    Index.findOne({ indexName: indexName })
        .then(indexDoc => {
            if(indexDoc) {
                Index.deleteOne({ indexName: indexName })
                    .then(success => {
                        if(success) {
                            const index = new Index({
                                indexName: indexName,
                                indexTag: indexTag,
                                duration: duration,
                                filePath: filePath,
                                fileName: fileName
                            })
                            index.save()
                                .then(result => {
                                    res.status(201).json({
                                        message:'Index addes successfully',
                                        index: result
                                    });
                                })
                                .catch(error => {
                                    res.json({
                                        message: 'Error'
                                    });
                                    if(!error.statusCode) {
                                        error.statusCode = 500;
                                    }
                                    next(err);
                                })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            const index = new Index({
                indexName: indexName,
                indexTag: indexTag,
                duration: duration,
                filePath: filePath,
                fileName: fileName
            })
            index.save()
            .then(result => {
                res.status(201).json({
                    message:'Index addes successfully',
                    index: result
                });
            })
            .catch(error => {
                res.json({
                    message: 'Error'
                });
                if(!error.statusCode) {
                    error.statusCode = 500;
                }
                next(err);
            }) 
        })
        .catch(error => {
            console.log(error);
        });
}

exports.getIndex = (req, res, next) => {
    Index.find()
        .then(doc => {
            if(!doc) {
                return console.log('Indexes do not exits!');
            }
            res.status(200).json(doc);
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getIndexFile = (req, res, next) => {
    const id = req.query.id;

    Index.findById(id)
        .then(index => {
            if(!index) {
                return console.log('Index does not exits');
            }
            const fileName = index.fileName;
            const filePath = path.join('/home','/hashan', '/project', '/server', '/public', fileName);
            res.sendFile(filePath);
        })
}