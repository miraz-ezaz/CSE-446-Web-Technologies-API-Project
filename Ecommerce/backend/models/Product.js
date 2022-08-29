const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const ProductSchema = new mongoose.Schema({
    productID:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    cat:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    bprice: {
        type: Number,
        required: true
    },
    sprice:{
        type: Number,
        required: true
    },
    available:{
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('Product', ProductSchema);