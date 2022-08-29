const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const CartSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  products: [
    {
      productID: {
        type: String,
      },
      quantity: {
        type: Number,
        default:0
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
        default:0
      },
      total:{
        type: Number,
        default:0
      }
    },
  ],
  subtotal:{
    type:Number,
    default:0
  },
});
module.exports = mongoose.model("Cart", CartSchema);
