const jwt=require('jsonwebtoken')
const jwtauth=(req,res,next)=>{
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error:'Token not found'})

   const token=req.headers.authorization.split(' ')[1];
   if(!token)  return res.status(401).json({error:'unauthorized'})
    
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded

        next()
    }
    catch(err){
        res.status(401).json({err:'invalid'})
    }
}

const generateToken=(userdata)=>{
    return jwt.sign(userdata,process.env.JWT_SECRET,{expiresIn:30000})
}

module.exports={jwtauth,generateToken}