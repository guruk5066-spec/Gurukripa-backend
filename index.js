const express=require('express');
const app=express();
const PORT=5000|6000;
const authroutes=require('./src/routes/authroutes');
require('./src/config/db');
app.use(express.json());
app.use('/api/auth',authroutes);

app.listen(PORT,async(req,res)=>{
    console.log(`Server is Running on PORT=${PORT}`);
})