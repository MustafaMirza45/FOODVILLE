const express = require ('express');
const bodyparser = require('body-parser');


const connection=require('./sql');
connection.connect((err) => {
    
  if (err) throw err;
    
});
const cur_user= express.Router();

cur_user.use(bodyparser.json());


cur_user.route('/')
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })
.get((req,res,next)=>{
    
    connection.query('SELECT * FROM user ', (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data received from Db:',rows);
        res.send(rows);
    });
  })
.post( (req, res, next) => {
   
    console.log(req.body);

    connection.query('select count(*) as cou from user where User_name="'+req.body.User_Name+'";', (err,rows) => {
      if(err) throw err;
    if(rows[0].cou ==0){
      connection.query('insert into user (first_name,Last_name,Phone_num,Email,Password,User_name,Home_address,Gender) values("'+ req.body.first_name +'","'+ req.body.Last_name +'","'+ req.body.Phone_num +'","'+req.body.Email + '","'+ req.body.Password +'","'+ req.body.User_Name +'","'+ req.body.Home_address +'","'+ req.body.Gender +'");', (err,rows) => {
          if(err) throw err;
          console.log("in insert");
        
         // console.log('Data inserted into Db:');
          res.send({Insert: true});
      });
    }else{
        //console.log('already exists');
        res.send({Insert: false});
    }
    
  


  });



   })

module.exports = cur_user;