const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const db = require('./connect')
const server = express();

server.set('view engine', 'ejs')
server.use(bodyParser.json())
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: true }));

//router 
require('./routers/home.router')(server)
const auth = require('./moddleware/auth');


const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

server.use(cors(corsOptions));
//api
require('./routers/api.account')(server)
require('./routers/api.category')(server)
require('./routers/api.product')(server);

server.use(auth)

require('./routers/account.router')(server)
require('./routers/category.router')(server)
require('./routers/product.router')(server);


server.listen(8888, function() {
    console.log('http://localhost:8888')
})