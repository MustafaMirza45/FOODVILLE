const express = require ('express');
const bodyparser = require('body-parser');

const connection=require('./sql');
connection.connect((err) => {
    
  if (err) throw err;
      //console.log('Connected!');
    
});
const review = express.Router();

review.use(bodyparser.json());

review.route('/')
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })
.get((req,res,next)=>{
    
    connection.query('SELECT * FROM review ', (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data received from Db:',rows);
        res.send(rows);
    });
  })
.post( (req, res, next) => {
  

        connection.query('insert into review (Rate,Comment,User_ID,Restaurant_ID) values("'+ req.body.rating +'","'+ req.body.comment+ '","'+ req.body.User_ID+ '","'+ req.body.Restaurant_ID+ '")' , (err,rows) => {
            
          if(err) throw err;
          res.write('Will add thes review: ' + req.body.comment + ' with details: ' + req.body.rating);
                    connection.query('select AVG(Rate) as avg from review where Restaurant_ID= '+ req.body.Restaurant_ID , (err,rows1,fields) => {
                      if(err) throw err;
                    
                    console.log('Data received from Db:',rows1[0].avg);
                    let a = rows1[0].avg;
                    //res.write(a);  //masla
                              connection.query('update restaurant  set Rating=('+a+') where Restaurant_ID= '+ req.body.Restaurant_ID ,(err,rows2,fields) => {
                                if(err) throw err;
                                 
                              })
 }); 
           // console.log('Data inserted into Db:');
            
        });
      
        
        
   
   })

review.route('/check')
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
})
.post( (req, res, next) => {
  
  console.log(req.body)
  connection.query('select count(*) as cou from review where Restaurant_ID='+ req.body.Restaurant_ID+' and User_ID='+req.body.User_ID , (err,rows) => {
      
    if(err) throw err;
    console.log(rows[0].cou)
   if (rows[0].cou === 0){
     res.send(false);
   }else{
     res.send(true);
   }

     // console.log('Data inserted into Db:');
      
  });

  
  

})
   module.exports = review