const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Account = require("../models/AccountNO");
const CryptoJS = require("crypto-js");
const Transaction = require("../models/Transaction");

router.put("/transfer",async (req,res)=>{

    try{
    senderACC = req.body.SA;
    receiverACC = req.body.RA;
    const sender = await User.findOne({accno: senderACC});
    const receiver = await User.findOne({accno: receiverACC});

    if(!receiver){
        res.status(404).json({message:"Receiver Account Not Found",success:false});
        return;
    }
    
    const hashedpin = CryptoJS.AES.decrypt(sender.pin,process.env.SECRET_KEY)
    .toString(CryptoJS.enc.Utf8);

    if(hashedpin!==req.body.pin)
    {
        res.status(500).json({message:"Invalid PIN",success:false});
        return;
    }

    amount = req.body.amount;

    if(amount > sender.balance)
    {
        res.json({message:"Insufficient Balance",success:false});
        return;
    }

    if((sender.balance-amount)<100)
    {
        res.json({message:"Minimum 100 tk Balance Required",success:false});
        return;
    }
    sender.balance = sender.balance - amount;
    receiver.balance = receiver.balance +amount;

    await sender.save();
    await receiver.save();

    

    const senderNew = await User.findOne({accno: senderACC});
    const receiverNew = await User.findOne({accno: receiverACC});
    const transaction = new Transaction({
        amount: amount,
        sender: senderACC,
        receiver: receiverACC
    });

    const Newtransaction = await transaction.save();
    if(Newtransaction)
    {
        res.status(200).json({transactionID:Newtransaction._id,success:true});
    }

    



    }
    catch(err)
        {
            console.log(err);
            res.json(err);

    }



});

module.exports = router;