const express= require('express');
const bodyparser = require('body-parser');
const sql = require('./sql');
const { request, response } = require('express');
const fetch_reviews = express.Router();

//express router using promise etc

sql.connect((err) => {
    if (err) throw err;
   // console.log('Connected!'); 
});

fetch_reviews.use(bodyparser.json());

fetch_reviews.route('/')

.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })

.post((req , res , next ) =>{    //req: frontend , res:respose to be sent back to fE. next-> agla func (if needed)
    sql.query('select Rate,Comment,User_ID,Restaurant_ID,first_name,Last_name from review,user where review.User_ID=user.UserID',
    (error,rows,fields)=>
    {
        if (error) {
            throw(error);
        }
        console.log('INSIDE GET REVIEWS',rows);
        res.send(rows);
    }); 
})


module.exports = fetch_reviews;    // i have made Get_USer a express router to handle /validate req




