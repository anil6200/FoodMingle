const express=require('express');
const router=express.Router();
const foodcontroller=require('../controllers/food.controller')
const authMiddleware=require('../middlewares/auth.middleware')
const multer=require('multer');

const upload=multer({
    storage:multer.memoryStorage(),
    limits:{fileSize:50*1024*1024},
})
/*POST/api/food/create [protected] */
router.post('/create',authMiddleware.authFoodPartnermiddleware,upload.single("file"),foodcontroller.createfood)

/*GET/api /food/ [protected] */
router.get("/fetch",authMiddleware.authUserMiddleware,foodcontroller.getFoodItems);

router.post('/like',authMiddleware.authUserMiddleware,foodcontroller.likeFoodItem)

router.post('/save',authMiddleware.authUserMiddleware,foodcontroller.saveFoodItem)



module.exports=router;