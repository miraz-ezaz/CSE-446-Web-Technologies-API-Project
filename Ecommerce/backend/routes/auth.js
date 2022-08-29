const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

//Config
dotenv.config()
//Registration of User

router.post("/register", async(req,res)=>{
    const newUser = new User({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY)
        .toString()
    });

    try{
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(200).json(savedUser);
    }catch(err){
        res.status(500).json({message: err});
        //console.log(err);
    }
});

//Login

router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({phone: req.body.phone});
        if(!user){
            res.status(404).json("User Not Found");
            return;
        }
       
        const hashedpassword = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY)
        .toString(CryptoJS.enc.Utf8);
        
        const userPassword = req.body.password;
        if(hashedpassword !== userPassword)
        {
            res.status(401).json("Incorrect Password");
            return;
        }
        const token = jwt.sign({
            userId:user._id
        },process.env.JWT_KEY,
        {
            expiresIn:"7d"
        });
        
        
        const {password, ...others}=user._doc;
        others["token"]=token;
        res.status(200).json(others);


    } catch(err)
    {
        res.status(401).json({message: err});
    }
    
    
});

module.exports = router;