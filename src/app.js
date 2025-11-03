const express = require('express');
const authroutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');



const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authroutes)
app.use('/api/posts',postRoutes)
app.use('')


module.exports = app;