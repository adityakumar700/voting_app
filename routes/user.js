const express=require('express')

const router=express.Router()
const User=require('../models/user')
const {jwtauth,generateToken}=require('../jwt')


router.post('/signup',async(req,res)=>{
    try{
        const data=req.body

        const  newuser=new User(data)

        const response=await newuser.save()
        const payload={
            id:response.id,
            
        }
        const token=generateToken(payload)
        res.status(200).json({response:response,token:token})
    }
    catch(err){
           res.status(500).json({error:'error occured'})
    }
})
router.post('/login',async(req,res)=>{
    try{
        const {addhar,password}=req.body;
        const user=await User.findOne({addhar:addhar})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'invalid username or password'})
        }

        const payload={
            id:user.id,
            
        }
        const token=generateToken(payload)
        res.json({token})
    }
    catch(err){
        res.status(500).json({error:'server error'})
    }
})
router.get('/profile',jwtauth,async(req,res)=>{
    try{
        const userdata=req.user
        const userid=userdata.id
        const user=await User.findById(userid)
        res.status(200).json({user})
    }
    catch(err){
        res.status(500).json({error:'server unreachable'})
    }
})
router.put('/profile/password',jwtauth,async (req,res)=>{
    try{
        const userid=req.user
            const{currentPassword,newPassword}=req.body
            const user=await User.findById(userid)

            if(!(await user.comparePassword(currentPassword))){
                return res.status(401).json({error:"invalid"})
            }
            user.password=newPassword
            await user.save()
        res.status(200).json(response)
    }
    catch(err){
        res.status(500).json({error:'error'})
    }
})
module.exports=router
