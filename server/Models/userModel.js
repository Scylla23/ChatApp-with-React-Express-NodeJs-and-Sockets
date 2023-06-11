const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {type: String , required:true , minlength: 3 , maxLength:30},
    email : {type: String , required:true , minlength: 3 , maxLength:200 , unique:true},
    password : {type: String , required:true , minlength: 3 , maxLength:1024},
},{
    timestamp:true,
}
);

const userModel = mongoose.model("User" , userSchema);

module.exports = userModel;