const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const SupplierSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bankacc:{
        type: String,
        required: true
    },
    address: {
        type: Map,
        of: String
    }

});

module.exports = mongoose.model("Supplier", SupplierSchema);