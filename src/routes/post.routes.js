const express = require('express');
const authmiddleware = require('../middleware/auth.middleware');

const { postController } = require('../controllers/post.controller');
const multer = require('multer');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post('/', authmiddleware ,
    upload.single('image')
    ,postController)

module.exports = router;
