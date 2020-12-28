const express= require('express');
const bodyparser = require('body-parser');
const sql = require('./sql');
const { request, response } = require('express');
const fetch_dish = express.Router();

//express router using promise etc

sql.connect((err) => {
    if (err) throw err;
   // console.log('Connected!'); 
});

fetch_dish.use(bodyparser.json());

fetch_dish.route('/')

.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })

.post((req , res , next ) =>{   
    sql.query('select * from dish_menu',
    (error,rows,fields)=>
    {
        if (error) {
            throw(error);
        }
        console.log('fetching dishes',rows);
        res.send(rows);
    }); 
})


module.exports = fetch_dish;    // i have made Get_USer a express router to handle /validate req




