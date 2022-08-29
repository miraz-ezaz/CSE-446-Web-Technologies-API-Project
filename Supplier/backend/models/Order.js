const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
var newDate = new Date();
currentTime = newDate.toLocaleString();
const OrderSchema = new mongoose.Schema({
    transactionID: {
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    products:[
        {
            productID:{
                type: String
            },
            quantity:{
                type: Number,
                default: 1

            },
        },   
    ],
    status:{
        type: String,
        default: "pending"
    },
    payment:{
        type: String,
        required: true
    },
    address:{
        type: Map,
        of: String,
        required: true
    },
    timestamp:{
        type: Map,
        of: String,
        default:{"orderplaced" : currentTime}
    }

});
module.exports = mongoose.model("Order",OrderSchema)