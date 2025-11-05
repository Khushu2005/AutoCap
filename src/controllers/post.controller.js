const postModel= require("../models/post.models");
const CaptionGenerate = require('../services/ai.service')

async  function  createPostController(req,res){
    const file = req.file;
    console.log("file recei:",file);
    const base64ImageFile = Buffer.from(file.buffer).toString('base64')
    
    const Caption = await CaptionGenerate(base64ImageFile)
   res.json({
    Caption
   })
  
    

}

module.exports ={
    createPostController
}