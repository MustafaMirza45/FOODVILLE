const express = require ('express');
const bodyparser = require('body-parser');

const connection=require('./sql');
connection.connect((err) => {
    
  if (err) throw err;
    //  console.log('Connected!');
    
});
const dish = express.Router();

dish.use(bodyparser.json());

dish.route('/')
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })


dish.route('/:resId')
//for dishid
.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
})
.get((req,res,next)=>{
    console.log(req.params.resId)
    connection.query('SELECT * FROM dish_menu where Restaurant_ID = ' +req.params.resId , (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data received from Db:',rows);
        res.send(rows);
    });
  })
  
.post( (req, res, next) => {
    connection.query('insert into dish_menu(Dish_name, Price,Serving, Restaurant_ID) values("'+req.body.Dish_name+'",'+req.body.Price+','+req.body.Serving+','+req.params.resId+')',(err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data inserted into Db:',rows);
        res.send(rows);
    });
 })
  
.put( (req, res, next) => {
    connection.query('Update dish_menu set Dish_name="'+req.body.Dish_name+'",Price="'+req.body.Price+'",Serving="'+req.body.Serving+'"  where Dish_ID ='+ req.params.resId , (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data updated:',rows);
        res.send(true)
        
    });
  })
  
.delete( (req, res, next) => {
    connection.query('delete from dish_menu where Dish_ID ='+ req.params.resId , (err,rows,fields) => {
        if(err) throw err;
      
        console.log('Data removed:',rows);
        res.send(true)
        
    });
});
  
module.exports = dish;