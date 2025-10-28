require('dotenv').config();
const server = require('./src/app');
const connectToDb = require('./src/db/db');

connectToDb();

server.listen(3001,()=>{
    console.log("Server is running on port http://localhost:3001");
    
})