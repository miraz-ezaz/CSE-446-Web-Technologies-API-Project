const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require('../middlewares/verify');
const axios = require("axios");


router.get('/:id',verify,async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        const {password, ...others}=user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json({message: err});
    }
   
})

router.put('/addacc',verify, async(req,res)=>{
    try{
        
       const updatedUser = await User.findByIdAndUpdate(req.body.userId,
        {bankacc:req.body.accno});
        if(!updatedUser)
        {
            res.json({success:false})
        }
        const {password, ...others}=updatedUser._doc;
        res.status(200).json(
            {
                success:true,
                data:others
            }

        );
        


    } catch(err)
    {
        res.status(401).json({message: err});
    }
    
    
});

router.post('/verifybank/',verify,async(req,res)=>{
    try{
        
        // const user = await User.findById(id);
        // const {password, ...others}=user._doc;
        const url = "http://localhost:7000/api/user/verify";
        const data=req.body;
        const response = await axios.post(url, data);
        res.send(response.data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
   
})


module.exports = router;