const express = require ('express');
const bodyparser = require('body-parser');

const connection=require('./sql');
connection.connect((err) => {
    
  if (err) throw err;
      //console.log('Connected!');
    
});
const set_user_loc = express.Router();

set_user_loc.use(bodyparser.json());

set_user_loc.route('/')
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })
.post( (req, res, next) => {

    connection.query('update user_location set latitude= '+req.body.lat+', longitude ='+req.body.lon+' where UserID= '+ req.body.Id ,
    (err,rows2,fields) => {
    if(err) throw err;
        
    })
    }); 
   module.exports = set_user_loc