const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Account = require("../models/AccountNO");
const CryptoJS = require("crypto-js");
const Transaction = require("../models/Transaction");
const Order = require("../models/Order");

router.post("/new", async(req,res)=>{
const{transactionID,userID,name,amount,products,payment,address} = req.body;
//console.log(req.body);
try{
const order = await Order.create({transactionID,userID,name,amount,products,payment,address});
if(order)
{
    res.json({supplied:true,data:order});
}
else{
    
    res.json("Order Not Submitted");
}
}catch(err)
{
    console.log(err);
    res.json(err)
}

});


module.exports = router;