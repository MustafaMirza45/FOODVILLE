
const express= require('express');
const http = require('http');
const morgan = require('morgan');
const bodyparser = require('body-parser');
require('events').EventEmitter.defaultMaxListeners = 20;
const cors = require('cors');
const cur_user = require('./operations/user_reg');
const res_man = require('./operations/res_manager');
const dishes = require('./operations/dishes');
const restaurant = require('./operations/restaurant');
const userlog =require('./operations/Validate');
const rev =require('./operations/review');
const uploadRouter = require('./operations/image');
const Get_User = require('./operations/Get_user');
const Get_All_rest = require('./operations/Get_all_resturants');
const User_review = require('./operations/reviews');
const fetch_review = require('./operations/fetch_reviews');
const fetch_dishes = require('./operations/fetch_dishes');

const set_user_loc = require('./operations/Set_user_loc');

const hostname = 'localhost';
const port = 3003;

const app = express();
app.use(cors());

app.use(morgan('dev'));

// parse requests of content-type - application/json

app.use(bodyparser.json());

app.use('/manager',res_man);
app.use('/validate',userlog);
app.use('/restaurant',restaurant);
app.use('/userprofile',Get_User);
app.use('/AllRestaurants', Get_All_rest);
app.use('/upload',uploadRouter);
app.use('/user',cur_user);
app.use('/dishes',dishes);
app.use('/review',rev);
app.use('/reviews', User_review);
app.use('/FetchedReviews', fetch_review);
app.use('/FetchedDishes', fetch_dishes);
app.use('/UserLocation',set_user_loc);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));

var imageDir=require('path').join(__dirname,'/public/');
app.use(express.static(imageDir));



app.use((req, res, next)=>{
      console.log(req.headers);
      res.statusCode = 200;
      res.setHeader('Content-Type','text/html');
      res.end('<html><body><h1>This is an Express Server</h1></body></html>');
    }

);


// set port, listen for requests
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

