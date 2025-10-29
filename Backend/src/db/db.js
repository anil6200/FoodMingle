const mongoose=require('mongoose');


function connectDb(){
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log('Database Connected Successfully');
        
    })
    .catch((e)=>{
        console.log("DataBase connection error",e);
        
    });
    
}
module.exports=connectDb;