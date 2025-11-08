const postModel = require("../models/post.models");
const CaptionGenerate = require('../services/ai.service');
const uploadFile = require("../services/storage.service");
const {v4 :uuidv4}= require('uuid')

async function createPostController(req, res) {
    const file = req.file;
    console.log("file received:", file);
    const base64ImageFile = Buffer.from(file.buffer).toString('base64')

    const Caption = await CaptionGenerate(base64ImageFile)
    const result = await uploadFile(file.buffer,`${uuidv4()}`)

    
    const post = await postModel.create({
        caption:result.caption,
        image:result.url,
        user:req.user._id
    })

    res.status(201).json({
        message:"Post Created Successfully",
        post
    })
}

module.exports = {
    createPostController
}