const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const dotenv = require("dotenv");
const cors = require('cors')

const MongoDBStore = require('connect-mongodb-session')(session);

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:false,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

//Config
dotenv.config()
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));

//Databse
mongoose
.connect(process.env.DB_URL)
.then(()=>console.log("Database Connected"))
.catch((err)=>{
    console.log(err);
});

var store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'mySessions'
  });

  // Session

  app.use(session({
    secret: process.env.SESSION_KEY,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: true
  }));

//Import Route

const userRoute = require('./routes/user');
const cartRoute = require('./routes/cart');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const paymentRoute = require('./routes/payment');

//Middlewear
app.use('/api/user',userRoute);
app.use('/api/cart',cartRoute);
app.use("/api/auth",authRoute);
app.use("/api/product",productRoute);
app.use("/api/payment",productRoute);


app.get("/",(req,res)=>{
    res.send("WELCOME TO Ecommerce")
});

//Port
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`)); 