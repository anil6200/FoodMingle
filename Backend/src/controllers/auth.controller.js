const userModel=require('../Models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const foodPartnerModel=require('../Models/foodpartner.model')
exports.registerUser=async(req , res)=>{
    try{
        console.log("Register body:", req.body);
        console.log("Headers:", req.headers);

        const {fullName , email , password}= req.body;
        const isUserAlreadyExists=await userModel.findOne({email});
        if(isUserAlreadyExists){
            return res.status(400).json({
                message:"Email Already Exists"
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await userModel.create({fullName , email , password:hashedPassword});
        const token=jwt.sign({
            id:user._id,

        },process.env.JWT_SECRET)
        res.cookie('Token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
        })
        res.status(201).json({
            message:'User created sucessfully',
            user:{
                _id:user._id,
                email:user.email,
                fullName:user.fullName
            }
        });
        

    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
}

exports.loginUser=async (req , res)=>{
    try{
        const {email , password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"invalid email or password"
            });

        }
        const ispasswordmatch= await bcrypt.compare(password,user.password);
        if(!ispasswordmatch){
            return res.status(400).json({
                success:false,
                message:"invalid Passwoord"
            });
        }
        const token=jwt.sign({
            id:user._id,
        },process.env.JWT_SECRET);

        res.cookie("Token",token);
        res.status(200).json({
            success:true,
            message:"User login Successfully",
            user:{
                _id:user._id,
                email:user.email,
                fullName:user.fullName
            }
        });

        
    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        });
    }
}

exports.logoutUser=async(req,res)=>{
    res.clearCookie("Token");
    res.status(200).json({
        success:true,
        message:"User Logout Successfull"
    });
}

exports.registerFoodPartner=async(req , res)=>{
    try{
        const {name , email , password, phone, address, businessName, }=req.body
        const isAccountAlreadyExists=await foodPartnerModel.findOne({email})
        if(isAccountAlreadyExists){
            return res.status(400).json({
                message:"Email Already exists"
            })
        }
        const hashedpassword=await bcrypt.hash(password , 10)
        const FoodPartner=await foodPartnerModel.create({name , email , password:hashedpassword,phone, address, businessName, });
        const token=jwt.sign({
            id:FoodPartner._id,

        },process.env.JWT_SECRET)

        res.cookie('Token',token,)
        res.status(200).json({
            success:true,
            message:"Food Partner Register Successfully",
            foodPartner:{
                id:FoodPartner._id,
                name:FoodPartner.name,
                email:FoodPartner.email,
                Address:FoodPartner.address,
                Phone:FoodPartner.phone,
                BusinessName:FoodPartner.businessName,
                
            }
        });
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

exports.loginFoodPartner=async(req , res)=>{
    try{
        const {email , password}=req.body
        const foodpartner=await foodPartnerModel.findOne({email})
        if(!foodpartner){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            });
        }
        const ismatch=await bcrypt.compare(password,foodpartner.password);
        if(!ismatch){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            })
        }
        const token = jwt.sign({
            id:foodpartner._id}

        ,process.env.JWT_SECRET)
        res.cookie("Token" , token)
        res.status(200).json({
            success:true,
            message:"Food partner login successfully"
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message
        })
    }
}
exports.logoutFoodPartner=async(req,res)=>{
    res.clearCookie("Token");
    res.status(200).json({
        success:true,
        message:'Food Partner logged out successfully'
    });
}