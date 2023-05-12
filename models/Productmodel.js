const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Product",ProductSchema);