const express=require('express')
const {registerUser , loginUser , logoutUser,loginFoodPartner,logoutFoodPartner,registerFoodPartner}=require('../controllers/auth.controller');

const router=express.Router();
// ye user ki auth apis hai 
router.post('/user/register',registerUser);
router.post('/user/login',loginUser);
router.get('/user/logout',logoutUser);

// ye food partner ki auth apis hai 

router.post('/food-partner/register',registerFoodPartner);
router.post('/food-partner/login',loginFoodPartner);
router.get('/food-partner/logout',logoutFoodPartner)

module.exports=router;