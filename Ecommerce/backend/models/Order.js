const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

var newDate = new Date();
currentTime = newDate.toLocaleString();
const OrderSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    transactionID: {
        type: String,
        default: "pending"
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
        default: "pending"
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