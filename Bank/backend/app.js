const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require("dotenv");

//Config
dotenv.config()
app.use(bodyParser.json());

//Databse
mongoose
.connect(process.env.DB_URL)
.then(()=>console.log("Database Connected"))
.catch((err)=>{
    console.log(err);
});

//Import Route

// const userRoute = require('./routes/user');
// const cartRoute = require('./routes/cart');
// const authRoute = require('./routes/auth');

//Middlewear
// app.use('/api/user',userRoute);
// app.use('/api/posts',cartRoute);
// app.use("/api/auth",authRoute);

app.get("/",(req,res)=>{
    res.send("WELCOME TO BAANK")
});

app.get("api/balance",(req,res)=>{
    res.send("Rqst rcvd")
});

//Import Route

const userRoute = require('./routes/user');
const transactionRoute = require("./routes/transaction");

//Middlewear
app.use('/api/user',userRoute);
app.use('/api/transaction',transactionRoute);

//Port
const port = process.env.PORT || 6000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));