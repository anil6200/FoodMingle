// Start Server
require('dotenv').config();
const app=require('./src/app');
const connectDb=require('./src/db/db')


connectDb();

app.listen(2000,(req , res)=>{
    console.log("Server is running on port 2000");
    
})