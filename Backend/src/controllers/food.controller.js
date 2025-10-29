
const Food=require('../Models/food.item');
const storageService=require('../services/Storage.services')
const likeModel=require('../Models/likes.model')
const saveModel=require('../Models/save.model')
const {v4:uuid}=require("uuid");
exports.createfood=async(req , res )=>{
    try{
    if(!req.file){
        return res.status(400).json({success:false,message:"no file uploaded"});
    }
    console.log("Food Partner:",req.foodPartner);
    console.log("Uploaded file Info:",req.file);
    const filename=uuid() + "_" + (req.file.originalname || "default.mp4");
    const fileUploadResult= await storageService.uploadFile(req.file.buffer,filename,"videos/");
    console.log("Imagekit result:" , fileUploadResult);
    const foodItem=await Food.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    });
    res.status(201).json({
        success:true,
        message:"food created successfully",
        file:fileUploadResult,
        foodItem,
        foodPartner:{
            id:req.foodPartner._id,
            name:req.foodPartner.name,
            email:req.foodPartner.email
        }
    });
    // res.send("Food Item Created Successfull")

    }catch(err){
        console.error("upload error",err);
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
     
} 

exports.likeFoodItem=async(req,res)=>{
    try{
        const {foodId}=req.body;
        const user=req.user;
        const isAlreadyLiked=await likeModel.findOne({
            user:user._id,
            food:foodId
        })
        console.log("Like Body:",req.body);
        console.log("User:",req.user)
        if(isAlreadyLiked){
            await likeModel.deleteOne({
                user:user._id,
                food:foodId
            })
            await Food.findByIdAndUpdate(foodId,{$inc:{likeCount:-1}});

            return res.status(200).json({
                success:true,
                message:"Food item unliked successfully"
            })
            
    }
    const newLike=await likeModel.create({
        user:user._id,
        food:foodId});
        await Food.findByIdAndUpdate(foodId,{
            $inc:{likeCount:1}
        })
        return res.status(200).json({
            success:true,
            message:"Food item liked successfully",
            newLike
        })
    

}catch(err){
    console.error(err);
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}
}

exports.saveFoodItem=async(req,res)=>{
    try{
        const {foodId}=req.body;
        const user=req.user;
        const isAlreadySaved=await saveModel.findOne({
            user:user._id,
            food:foodId
        })
        if(isAlreadySaved){
            await saveModel.deleteOne({
                user:user._id,
                food:foodId
            })
            return res.status(200).json({
                success:true,
                message:"Food item unsaved successfully"
            })
        }
        const newSave=await saveModel.create({
            user:user._id,
            food:foodId
        })
        return res.status(200).json({
            success:true,
            message:"Food  saved successfully",
            newSave
        })
    }catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.getFoodItems=async(req , res)=>{
    try{
        const foodItems=await Food.find().select("name video description foodPartner likeCount");
        res.status(200).json({
            success:true,
            message:"Food Item fetched successfully",
            foodItems
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Can not get food Items"
        })
    }
}