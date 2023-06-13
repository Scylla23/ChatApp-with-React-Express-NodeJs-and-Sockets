const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator")

const createToken = (_id) =>{
    const jwtKey = process.env.JWT_TOKEN;

    return jwt.sign({_id} , jwtKey);
}

const registerUser = async (req, res) =>{
    
    try{
        
        const {name , email , password} = req.body;
     
        let user =  await userModel.findOne({ email });
        
        // console.log(name);
        // console.log(email);
        // console.log(password);
        if(user)
            return res.status(400).json(" Email already registered");
        
        if(!name || !email || !password)
            return res.status(400).json(" Enter all the information ");
        
        if(!validator.isEmail(email))
            return res.status(400).json(" Enter a valid email ");
    
        if(!validator.isStrongPassword(password))
            return res.status(400).json(" Enter a strong password ");
        
        user = new userModel({name , email  , password});
        //console.log("user name " + user.name);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt);

        await user.save(); 

        const token = await createToken(user._id);

        res.status(200).json({_id : user._id , name , email , token})
    }catch(error){
        res.status(500).json(error)
    }
} 


const loginUser = async (req,res) =>{
   try{
        const { email , password} = req.body;
        
        let user =  await userModel.findOne({ email });
        if(!user)
                return res.status(400).json(" Invalid email or password ");
        
        const isValidPassword = await bcrypt.compare(password , user.password);
        if(!isValidPassword)
            return res.status(400).json(" Invalid email or password ");

        const token = await createToken(user._id);

        res.status(200).json({_id : user._id , name: user.name , email , token})
   }catch(error){
    res.status(500).json(error)
   }

}

const findUser = async (req,res) =>{
    try{
        const userId = req.params.userId;
        //console.log(userId);
        const user = await userModel.findById(userId);

        if(user)
            res.status(200).json(user)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}


const getUsers = async (req,res) =>{
    try{
        
        const user = await userModel.find();

       
            res.status(200).json(user)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}
module.exports = {registerUser , loginUser , findUser , getUsers};