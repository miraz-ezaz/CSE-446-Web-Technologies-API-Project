const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config()

const verify = (req, res, next) =>{
    const { authorization } = req.headers;
    try{
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        const { userId} = decoded;
        req.userId = userId;
        next();
    }catch{
        next(JSON.stringify(req.header.authorization));


    }
};

module.exports = verify;