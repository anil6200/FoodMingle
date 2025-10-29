const foodPartnerModel=require('../Models/foodpartner.model');
const userModel=require('../Models/user.model');
const jwt=require('jsonwebtoken');
async function authFoodPartnermiddleware(req,res,next){
    const token=req.cookies.Token;
    if(!token){
        return res.status(401).json({
            message:"Please Login First"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const foodPartner=await foodPartnerModel.findById(decoded.id);
        req.foodPartner=foodPartner
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid Token"})
    }
}
async function authUserMiddleware(req,res,next){
    const token=req.cookies.Token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please Login First"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.id);
        req.user=user
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Invalid Token"
        })
    }
}
module.exports={authFoodPartnermiddleware,authUserMiddleware}