const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const connection=require('./sql');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/:resid')

.post(upload.single('image'), (req, res) => {
    console.log(req);
    let img_src = "images/" + req.file.filename;
    connection.query('update restaurant set img_src ="'+img_src+'" where Restaurant_ID ='+req.params.resid, (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data received from Db:',rows);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    });
    
})
uploadRouter.route('/dish/:resid')

.post(upload.single('image'), (req, res) => {
    console.log(req);
    let img_src = "images/" + req.file.filename;
    connection.query('update dish_menu set img_src ="'+img_src+'" where Dish_ID ='+req.params.resid, (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data received from Db:',rows);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    });
    
})
uploadRouter.route('/user/:resid')

.post(upload.single('image'), (req, res) => {
    console.log(req);
    let img_src = "images/" + req.file.filename;
    connection.query('update user set img_src ="'+img_src+'" where User_ID ='+req.params.resid, (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data received from Db:',rows);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    });
    
})




module.exports = uploadRouter;