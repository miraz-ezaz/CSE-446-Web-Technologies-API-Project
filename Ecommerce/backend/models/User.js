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
    email: {
        type: String,
        required: true

    },
    password: {
        type:String,
        required: true
    },
    bankacc: {
        type: String,
        default:"notset"
    },
    address: {
        type: Map,
        of: String,
        default:{"address": "notset"}

    },
    date: {
        type: String,
        default: currentTime
    }
});

module.exports = mongoose.model('User', UserSchema);