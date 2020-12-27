const express = require ('express');
const bodyparser = require('body-parser');

const connection=require('./sql');
connection.connect((err) => {
    
  if (err) throw err;
      //console.log('Connected!');
    
});
const restaurant = express.Router();

restaurant.use(bodyparser.json());

restaurant.route('/')
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })
.get((req,res,next)=>{
    
    connection.query('SELECT Rest_Name,foodinn.restaurant.Restaurant_ID,Website,Rating,Contact_no,img_src,Address,Manager_ID,Cuisine_Type, Latitude, Longitude FROM foodinn.restaurant left join foodinn.rest_location on rest_location.Restaurant_ID = restaurant.Restaurant_ID ', (err,rows,fields) => {
        if(err) throw err;

        console.log('Data received from Db:',rows);
        
        res.send(rows);
    });
  })
.post( (req, res, next) => {
    console.log('request:',req.body);
    connection.query('INSERT INTO foodinn.restaurant (Rest_Name,Website,Contact_no,Address,Manager_ID,Cuisine_Type) VALUES ("'+ req.body.Rest_Name +'","'+ req.body.Website+'","'+req.body.Contact_no+'","'+  req.body.Address +'",'+ req.body.Manager_ID+',"'+ req.body.Cuisine_Type+'")', (err,rows,fields) => {
        if(err) throw err;
        console.log('Data received from Db:',rows);
          connection.query('Select Restaurant_ID from restaurant where Rest_Name="'+req.body.Rest_Name+'" and Manager_ID='+req.body.Manager_ID, (err,rows1,fields) => {
            if(err) throw err;
              console.log('Data received from Db:',rows1);
                let id = rows1[0].Restaurant_ID
            if(req.body.lat === null){
                connection.query('INSERT INTO foodinn.rest_location (Restaurant_ID)VALUES ('+id+')', (err,rows,fields) => {
                  if(err) throw err;
                
                  console.log('Data received from Db:',rows);
                  res.send(true);
                });
            }else{
              connection.query('INSERT INTO foodinn.rest_location (latitude,longitude,Restaurant_ID)VALUES ("'+ req.body.lat +'","'+ req.body.lng+'",'+id+')', (err,rows,fields) => {
                if(err) throw err;
              
                console.log('Data received from Db:',rows);
                res.send(true);
              });
            }
               
            
            console.log('Data received from Db:',rows);
          
          });

      
       
      
    });
   })
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /chefs');
  })
.delete((req, res, next) => {
    res.end('Deleting all the chefs!');
  });
  

restaurant.route('/:manId')
//for dishid
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    connection.query('SELECT Rest_Name,foodinn.restaurant.Restaurant_ID,Website,Rating,Contact_no,img_src,Address,Manager_ID,Cuisine_Type, Latitude, Longitude FROM foodinn.restaurant left join foodinn.rest_location on rest_location.Restaurant_ID = restaurant.Restaurant_ID where Manager_ID ='+req.params.manId , (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data received from Db:',rows);
        res.send(rows);
    });
  })
  
.post( (req, res, next) => {
      res.statusCode = 403;
      res.end('POST operation not supported on /chefs/'+ req.params.chefId);
   })
  
.put( (req, res, next) => {
      res.write('Updating the chef: ' + req.params.chefId + '\n' );
      res.end('will update the chef: ' + req.body.name + ' with details: ' + req.body.description);
  })
  
.delete( (req, res, next) => {
    res.end('Deleting chef: ' + req.params.chefId);
});
  
module.exports = restaurant;