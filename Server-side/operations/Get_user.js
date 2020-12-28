const express= require('express');
const bodyparser = require('body-parser');
const sql = require('./sql');
const { request, response } = require('express');
const Get_User = express.Router();

//express router using promise etc

sql.connect((err) => {
    if (err) throw err;
   // console.log('Connected!'); 
});

Get_User.use(bodyparser.json());

Get_User.route('/')

.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })

.post((req , res , next ) =>{    //req: frontend , res:respose to be sent back to fE. next-> agla func (if needed)
    sql.query('select * from user where UserID = "'+req.body.Id+ '"',
    (error,rows,fields)=>
    {
        //console.log(req.body.values);
        console.log("hhh" +req.body.Id);

        if (error) {
            throw(error);
        }
        console.log('Data fetched ' + rows[0].first_name + rows[0].Last_name );
            res.send({FirstName: rows[0].first_name , LastName :rows[0].Last_name  , imgsrc: rows[0].img_src  , address :rows[0].Home_address })
    }); 
})


module.exports = Get_User;    // i have made Get_USer a express router to handle /validate req