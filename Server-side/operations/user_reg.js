const express = require ('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
var nev = require('node-email-validator');

const connection=require('./sql');
connection.connect((err) => {
    
  if (err) throw err;
    
});
const cur_user= express.Router();

cur_user.use(bodyparser.json());


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'foodville.pvt.ltd@gmail.com',
      pass: 'FoodVille123'

  }


})
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
      let mailOptions = {
        from: 'foodville.pvt.ltd@gmail.com',
        to: req.body.Email,
        subject: 'Registration Confirmation',
        text: 'Congratulations! you have successfully registered your account on FoodVille'
    
      }
      nev(req.body.Email)
      .then(validation => {console.log(validation);
        if(validation.isEmailValid){
            connection.query('insert into user (first_name,Last_name,Phone_num,Email,Password,User_name,Home_address,Gender) values("'+ req.body.first_name +'","'+ req.body.Last_name +'","'+ req.body.Phone_num +'","'+req.body.Email + '","'+ req.body.Password +'","'+ req.body.User_Name +'","'+ req.body.Home_address +'","'+ req.body.Gender +'");', (err,rows) => {
                if(err) throw err;
                console.log("in insert");
                connection.query('Select UserID from user where User_name="'+req.body.User_Name+'"', (err,rows1,fields) => {
                  if(err) throw err;
                    console.log('Data received from Db:',rows1);
                      let id = rows1[0].UserID
                      connection.query('INSERT INTO foodinn.user_location (UserID)VALUES ('+id+')', (err,rows,fields) => {
                        if(err) throw err;
                        transporter.sendMail(mailOptions,function(err,data){
                          if(err){
                              console.log('An Error Occured',err);
                              res.send({Insert: true,email: true,sent:false});
                          } else{
                              console.log('Email has been successfully sent',data);
                              res.send({Insert: true,email: true,sent:true});
                          }
                        })
                      
                      });
                
                });
              // console.log('Data inserted into Db:');
              
            });
        }else{
          res.send({Insert: true,email: false,sent:false});
          }
    })
    .catch(error => console.log(error));


    }else{
        //console.log('already exists');
        res.send({Insert: false,email: true,sent:false});
    }
    
  


  });



   })

module.exports = cur_user;