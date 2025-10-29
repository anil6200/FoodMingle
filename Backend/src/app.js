// create Server
const express=require('express');
const cookieparser=require('cookie-parser');
const router=require('./routes/routes');
const foodRoutes=require('./routes/food.routes')
const foodPartnerRoutes=require('./routes/food.partner.routes')
const cors=require('cors');
const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use(cookieparser());

app.get('/',(req , res)=>{
    res.send('Server is Working')
});
app.use('/api',router);
app.use('/api/food',foodRoutes)
app.use('/api/food-partner',foodPartnerRoutes)
module.exports=app;