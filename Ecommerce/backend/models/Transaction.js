const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

var newDate = new Date();
currentTime = newDate.toLocaleString();
const TransactionSchema = new mongoose.Schema({
    transactionID: {
        type: String,
        required: true
    },
    orderID: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: currentTime
    }

});
module.exports = mongoose.model("Transaction", TransactionSchema); 