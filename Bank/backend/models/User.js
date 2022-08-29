const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');


var newDate = new Date();
currentTime = newDate.toLocaleString();
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    pin: {
        type:String,
        required: true
    },
    accno: {
        type: String,
        default:"notset"
    },
    balance: {
        type:Number,
        default:1000
    },
    date: {
        type: String,
        default: currentTime
    }
});

module.exports = mongoose.model('User', UserSchema);