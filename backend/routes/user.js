const express = require("express");
const router= express.Router();
const zod=require('zod')
const jwt=require('jsonwebtoken');
const {authMiddleware} = require('../middleware')
//signup/signin routes
const signupSchema= zod.object({
    name:zod.string(),
    email:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})
router.post("/signup",(req,res) =>{
    const body =req.body;
    const {success}=signupSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({message:"incorrect inputs"})
    }

})

const existUser=await User.findone({
    username: req.body.username,
})
if(existUser){
    return res.status(400).json({message:"exist acc"})
}

const user=await User.create({
    username: req.body.username,
   password: req.body.password,
    firstName: req.body.firstName,
    lasttName: req.body.lastName
})

const userId = user._id;
const token =jwt.sign({
    userId
},JWT_SECRET)
res.json({message:"user created"})

const updateBody =zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.put('/update',authMiddleware ,async (req,res) =>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({message:"invalid user"})
    }
    await User.updateOne.req.body,{
        id:req.userId
    }
    res.json({message:"user updated succesfully"})
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
     $or : [{
         username : { $regex : filter }
     }, {
         email : { $regex : filter }
     }]
    })

     res.json({
         user: users.map(user=>({
             username : user.username,
             firstName : user.firstName,
             lastName : user.lastName,
             id : user._id
         }))
     })
 })

 await Account.create({
    userId, balance : 1 + Math.random() * 10000
})

module.exports=router;