const foodPartnerModel=require("../Models/foodpartner.model");
const foodModel=require("../Models/food.item")

async function getFoodPartnerById(req, res) {
    const foodPartnerId=req.params.id;
    try{
        const foodPartner=await foodPartnerModel.findById(foodPartnerId);
        const foodItemsByFoodPartner=await foodModel.find({foodPartner:foodPartnerId})
        if(!foodPartner){
            return res.status(404).json({
                success:false,
                message:"Food Partner not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Food Partner fetched successfully",
            foodPartner:{
                ...foodPartner.toObject(),
                foodItems:foodItemsByFoodPartner
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Cannot fetch food partner",err
        });
    }
}

module.exports={getFoodPartnerById};