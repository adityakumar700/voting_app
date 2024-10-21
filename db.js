const mongoose=require('mongoose')
require('dotenv').config()

const mongoURL=process.env.MONGODB_URL_LOCAL

mongoose.connect(mongoURL,{
   
    
})

const db=mongoose.connection

db.on('connected',()=>{
    console.log("connected")
})
db.on('error',(err)=>{
    console.error("error",err);
})

