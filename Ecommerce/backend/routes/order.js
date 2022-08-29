const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");

router.post("/order", async(req,res)=>{
    const{userID,phone,amount,products,address} = req.body;
    try{
    const order = await Order.create({userID,phone,amount,products,address});
    if(order)
    {
        res.json({success:true,data:order,orderID:order._id});
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


router.put("/confirmpayment",async(req,res)=>{
    const {id,transactionID} = req.body
    try{
const newOrder = await Order.findByIdAndUpdate(id,{transactionID:transactionID,payment:"paid"});
if(newOrder){
    res.json({success:true,data:newOrder});
}
    }
    catch(err){
        console.log(err);
        res.json(err)
    }
});
module.exports = router;