const express = require ('express');
const bodyparser = require('body-parser');

const connection=require('./sql');
connection.connect((err) => {
    
  if (err) throw err;
    //  console.log('Connected!');
    
});
const rev = express.Router();

rev.use(bodyparser.json());

rev.route('/')
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })


rev.route('/:resId')
//for dishid
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
})
.get((req,res,next)=>{
    console.log(req.params.resId)
    connection.query('SELECT user.User_name, review.Comment, review.Rate FROM review left join foodinn.user on user.UserID = review.User_ID where Restaurant_ID = ' +req.params.resId , (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data received from Db:',rows);
        res.send(rows);
    });
  })
  

  
module.exports = rev;