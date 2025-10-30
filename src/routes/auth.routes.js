const express = require('express');
const { registerController, loginController } = require('../controllers/auth.controller');  


const router = express.Router();

//Defies the Routes

router.post('/register',registerController)

module.exports = router;