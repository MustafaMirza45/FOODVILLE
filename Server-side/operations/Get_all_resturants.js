const express= require('express');
const bodyparser = require('body-parser');
const sql = require('./sql');
const { request, response } = require('express');
const Get_All_rest = express.Router();

//express router using promise etc

sql.connect((err) => {
    if (err) throw err;
   // console.log('Connected!'); 
});

Get_All_rest.use(bodyparser.json());

Get_All_rest.route('/')

.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })

.post((req , res , next ) =>{    //req: frontend , res:respose to be sent back to fE. next-> agla func (if needed)
    sql.query('SELECT Rest_Name, foodinn.restaurant.Restaurant_ID , Website , Rating , Contact_no , img_src , Address , Manager_ID , Cuisine_Type , foodinn.rest_location.latitude, foodinn.rest_location.longitude FROM restaurant left join rest_location on rest_location.Restaurant_ID = restaurant.Restaurant_ID',
    (error,rows,fields)=>
    {
        if (error) {
            throw(error);
        }
        console.log('INSIDE GET ALL REST',rows);
        res.send(rows);
    }); 
})


module.exports = Get_All_rest;    // i have made Get_USer a express router to handle /validate req
