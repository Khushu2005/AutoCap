const express = require('express');
const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken')

const router = express.Router();

router.post('/register',async(req,res)=>{
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
        password
    })
    
    const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
        user:user
       
        
    })
     console.log(user);
})

module.exports = router;