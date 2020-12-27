
const express= require('express');
const http = require('http');
const morgan = require('morgan');
const bodyparser = require('body-parser');

const cors = require('cors');
const cur_user = require('./operations/user_reg');
const res_man = require('./operations/res_manager');
const restaurant = require('./operations/restaurant');
const userlog =require('./operations/Validate');
const uploadRouter = require('./operations/image');
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
app.use('/upload',uploadRouter);
app.use('/user',cur_user);
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

