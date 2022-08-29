const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const { stringify } = require('nodemon/lib/utils');



const AccSchema = new mongoose.Schema({
    name:{
        type: String,
        default: 'first'
    },
    acc:{
        type:Number,
        default:10001
    }

});

module.exports = mongoose.model('Account', AccSchema);