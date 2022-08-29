const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const Cart = require("../models/Cart");
const verify = require("../middlewares/verify");

router.post("/add", async (req, res) => {
  const { userID, productID,name,  } = req.body;
  const cart = await Cart.findOne({ userID });
  const quantity = parseInt(req.body.quantity);
  const price = parseInt(req.body.price);
  try {
    if (cart) {
      let itemIndex = cart.products.findIndex((p) => p.productID == productID);
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity += quantity;
        productItem.price = price;
        productItem.total = productItem.quantity * productItem.price;
        cart.subtotal = cart.products
          .map(product=>product.total)
          .reduce((acc, next) => acc + next);
      } else {
        const total = price * quantity;
        cart.products.push({ productID, quantity, name, price, total });
        cart.subtotal = cart.products
          .map(product=>product.total)
          .reduce((acc, next) => acc + next);
      }
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
        const total = price * quantity;
        const products =[ { productID, quantity,name,price,total}];
        const subtotal = products.map(product=>product.total).reduce((acc, next) => acc + next);
        const newCart = await Cart.create({
            userID,
            products:products,
            subtotal
        });
        res.status(200).json(newCart);
    }
  } catch(err) {
    console.log(err);
    res.json(err)
  }
});

router.get("/length/:id",async(req,res)=>{
    const userID = req.params.id;
    try{
        const cart = await Cart.findOne({ userID });
        if(cart)
        {
            const length = cart.products.length;
            res.status(200).json({length:length});
        }
        else
        {
            res.status(200).json({length:0});
        }
    }catch(err)
    {
        console.log(err);
        res.json(err);
    }
    

});
router.get("/:id",async(req,res)=>{
  const userID = req.params.id;
  try{
      const cart = await Cart.findOne({ userID });
      if(cart)
      {
        const length = cart.products.length;
          res.status(200).json({data:cart,length:length,item:true});
      }
      else
      {
          res.status(200).json({length:0,message:"You have No item in your cart",item:false});
      }
  }catch(err)
  {
      console.log(err);
      res.json(err);
  }
  

});

module.exports = router;
