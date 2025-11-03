// Defies the Routes

const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

async function registerController(req,res) {
   
    const {username,password} = req.body;

    const ExistingUser = await userModel.findOne({
        username
    })

    if(ExistingUser){
        return res.status(409).json({
            message:"User already exists"
        })
    }

    const user = await userModel.create({
        username,
        password :await bcrypt.hash(password,10 )
    })
    
    const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
        user:user
    
    })   
}

async function loginController(req,res) {
    const {username,password} = req.body;  

    const user = await userModel.findOne({      
        username,
        
    })

    if(!user){  
        return res.status(404).json({
            message:"User not found"
        })
    }

    isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)    {
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
    res.cookie("token",token)

    res.status(200).json({
        message:"Login Successful",
        user:user
    })


 }


module.exports = {
    registerController,
    loginController
}