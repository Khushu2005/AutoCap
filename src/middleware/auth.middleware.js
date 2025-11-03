const jwt = require('jsonwebtoken');
const userModel = require('../models/user.models');

async function authmiddleware(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access login required"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await userModel.findOne({
            _id: decoded.id
        })

        req.user = user;

        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid Token Please login again"
        })
    }
}
module.exports = authmiddleware;