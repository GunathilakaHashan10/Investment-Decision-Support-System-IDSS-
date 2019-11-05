const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const authRoutes = require('./routes/auth');
const shareHandleRoutes = require('./routes/shareHandle');
const indexHandleRoutes = require('./routes/indexHandle');
const ltpRoutes = require('./routes/ltp');
const shareComparsionRoutes = require('./routes/shareComparison');
const adminRoutes = require('./routes/admin');
const adsPublishRoutes = require('./routes/adsPublish');
const adsDetailsRoutes = require('./routes/adsDetails');
const publisherAds = require('./routes/publisherAds');
const bankRoutes  = require('./routes/bank');
const advertiserRoutes = require('./routes/advertiserDetails');
const messagesRoutes = require('./routes/messages');

// const MONGODB_URI = 'mongodb+srv://Hashan:8vVk7bvOXLSeIf0m@cluster0-ouuzw.gcp.mongodb.net/test?retryWrites=true&w=majority';
const MONGODB_URI = 'mongodb://localhost:27017/jarvis';

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;


// var imageStorage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'public/homeImages');
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

var muterStorage = multer.diskStorage({
    destination: function(req, file, cb){
        let path = req.query.pathName;
        cb(null, `public/${path}`);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

// var imageUpload = multer({ storage: imageStorage}).array('adsImages');
var imageUpload = multer({ storage: muterStorage}).array('adsImages');
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(imageUpload);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use('/auth',authRoutes);
app.use(shareHandleRoutes);
app.use(indexHandleRoutes);
app.use(ltpRoutes);
app.use(shareComparsionRoutes);
app.use('/admin',adminRoutes);
app.use(adsPublishRoutes);
app.use(adsDetailsRoutes);
app.use(publisherAds);
app.use(bankRoutes);
app.use('/advertiser', advertiserRoutes);
app.use('/contact', messagesRoutes);


app.use((error, req, res, next) => {
    // res.json({message: error.message })
    console.log(error.message);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(port, () => {
            console.log("Server is running on port: " + port);
        })
    })
    .catch(err => {
        console.log(err);
    });


