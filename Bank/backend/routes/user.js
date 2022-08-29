const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Account = require("../models/AccountNO");
const CryptoJS = require("crypto-js");

//Registration of User

router.post("/register", async(req,res)=>{

    const accObject = await Account.findOne({name:"first"});
    if(!accObject){
        res.status(404).json("Account Found");
        return;
    }
    console.log(accObject);
   
    const acc = accObject.acc;
    console.log(acc)
    const newUser =  new User({
        name:req.body.name,
        phone:req.body.phone,
        pin:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY)
        .toString(),
        accno:acc,
    });

    try{
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(200).json(savedUser);
        const newacc = acc+1;
        accObject.acc = newacc;
        accObject.save();
    }catch(err){
        res.status(500).json({err});
        //console.log(err);
    }
});

// router.post("/first", async(req,res)=>{
//     const account = new Account();
//     account.save();
//     res.json("SAVED")

// });

router.post("/balance",async(req,res)=>{
    try{
        const user = await User.findOne({accno:req.body.accno});
    if(!user){
        res.status(404).json("Account Not Found");
        return
    }
    const hashedpin = CryptoJS.AES.decrypt(user.pin,process.env.SECRET_KEY)
    .toString(CryptoJS.enc.Utf8);

    if(hashedpin!==req.body.pin)
    {
        res.status(500).json("Invalid PIN");
        return;
    }

    res.status(200).json(user.balance);

    }
    catch(err)
    {
res.json(err)
    }



});

router.post('/verify',async(req,res)=>{
    try{
        const user = await User.findOne({accno:req.body.accno});
    if(!user){
        res.json({"validity":"Account Not Found"});
        return
    }
    const hashedpin = CryptoJS.AES.decrypt(user.pin,process.env.SECRET_KEY)
    .toString(CryptoJS.enc.Utf8);

    if(hashedpin!==req.body.pin)
    {
        res.json({"validity":"Invalid PIN"});
        return;
    }

    res.status(200).json({
        "accno":user.accno,
        "validity":"Valid"
    });

    }
    catch(err)
    {
res.json(err)
    }
});

module.exports = router;