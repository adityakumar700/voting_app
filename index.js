const express=require('express')
const app=express()
const path=require('path')
const db=require('./db')

require('dotenv').config()
const  bodyParser=require('body-parser')


app.use(bodyParser.json())
const PORT=process.env.PORT || 3005

const userRoutes=require('./routes/user')
const candidateRoutes=require('./routes/candidate')

app.use('/user',userRoutes)
app.use('/candidate',candidateRoutes)
app.listen(PORT,()=>{
    console.log(`listen on port 3009`)
})