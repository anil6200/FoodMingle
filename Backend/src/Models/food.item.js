const mongoose=require('mongoose');

const FoodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodPartner"
    },
    likeCount:{
        type:Number,
        default:0
    }
});
module.exports=mongoose.model('food',FoodSchema)