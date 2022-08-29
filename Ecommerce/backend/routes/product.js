const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const data = require("../data");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if(products)
    {
        res.status(200).send(products)
    }
    else{
        res.send("List Empty")
    }
  } catch(err) {
    console.log(err)
    res.json(err)
  }
});

router.post("/add", async (req, res) => {
  try {
    const {
      productID,
      name,
      description,
      cat,
      image,
      bprice,
      sprice,
      available,
    } = req.body;

    const product = await Product.create({
      productID,
      name,
      description,
      cat,
      image,
      bprice,
      sprice,
      available,
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.json("Product Not Added");
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findOne({productID: req.params.id});
      if(product)
      {
          res.status(200).send(product);
          console.log(product);
      }
      else{
          res.send("Product Not Found")
      }
    } catch(err) {
      console.log(err)
      res.json(err)
    }
  });
module.exports = router;
