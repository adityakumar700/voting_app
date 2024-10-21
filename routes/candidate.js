const express=require('express')

const router=express.Router()
const Candidate=require('../models/candidate')
const {jwtauth,generateToken}=require('../jwt')


router.post('/signup',async(req,res)=>{
})