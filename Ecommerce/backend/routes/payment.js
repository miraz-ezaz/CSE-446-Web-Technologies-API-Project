const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Order = require("../models/Order");
const axios = require("axios");

router.post("/pay",async(req,res)=>{
    const {senderACC, receiverACC, pin,amount }= req.body;
    
    try{
        const url = "http://localhost:7000/api/transaction/transfer";
        const data={senderACC, receiverACC, pin,amount };
        const response = await axios.put(url, data);
        if(response)
        {
            res.send(response.data);
        }

    }catch(err){
        console.log(err);
        res.json(err)
    }
});

module.exports = router;