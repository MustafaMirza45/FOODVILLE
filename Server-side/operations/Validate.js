const express= require('express');
const bodyparser = require('body-parser');
const sql = require('./sql');
const { request, response } = require('express');
const userLog = express.Router();   

//express router using promise etc

sql.connect((err) => {
    if (err) throw err;
   // console.log('Connected!'); 
});

userLog.use(bodyparser.json());

userLog.route('/')

.all((req, res, next) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    next();
  })

.post((req , res , next ) =>{    //req: frontend , res:respose to be sent back to fE. next-> agla func (if needed)
    sql.query('select count (*) as cou, UserID from user where User_name = "'+
    req.body.username + '" AND user.Password = "'+ req.body.pass+'"',
    (error,rows,fields)=>
    {
        console.log(req.body);

        if (error) {
            throw(error);
        }
        console.log('Data fetched' + rows[0].cou);
        if(rows[0].cou == 1) 
        {
            res.send({user:'User' , ID: rows[0].UserID , ErrorMessage : false} ) 
        }
        else 
        {
             sql.query('select count (*) as cou, Manager_ID from restaurant_manager where User_Name = "'+
             req.body.username + '" AND Password = "'+ req.body.pass+'"',
             (error,rows,fields)=>
             {
                if(error){
                    throw(error); 
                }
                console.log("Data fetched from manager " + rows[0].cou);
                if (rows[0].cou == 1)
                {
                    res.send({user:'Manager' , ID: rows[0].Manager_ID, ErrorMessage : false});
                }
                else
                {
                    res.send({ErrorMessage : true });
                }

             })
        };
    }); 
}
) 



// userLog.route('/:potti')
// .all((req, res, next) =>{
//     res.statusCode= 200;
//     res.setHeader('Content-Type','application/json');
//     next();
//   })

// .get((req , res , next ) =>{
//     //req.body.username
//     //logic
//     res.end("lmao maza aagaya " + req.params.potti);
//     //sql.query 
// }
// )


module.exports = userLog;    // i have made userLog a express router to handle /validate req