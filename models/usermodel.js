const mongoose =require("mongoose");
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken")
require("dotenv").config();
const key = process.env.JWT_KEY

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

// password hashing
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await  bcrypt.hash(this.password,10);
    }
    next();
})

// token generate

UserSchema.methods.generatetoken =async function(){
    try {
        let usertoken = jwt.sign({_id:this._id},key);
        return usertoken;
    } catch (error) {
        res.status(422).send(error)
    }
}




const userModel = mongoose.model("User",UserSchema)


module.exports=userModel;