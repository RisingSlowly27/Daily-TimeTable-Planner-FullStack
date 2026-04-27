import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import Weeks from "../models/Weeks.models.js"

const router=express.Router();

router.get("/",asyncHandler(async(req,res)=>{
    const weeks=await Weeks.find({email:req.user.email});
    res.status(200).json(weeks);
}));

router.post("/",asyncHandler(async(req,res)=>{
    const week=new Weeks({...req.body,email:req.user.email});
    await week.save();
    res.status(201).json({message:"Success"});
}));

router.put("/name",asyncHandler(async(req,res)=>{
    await Weeks.updateOne({email:req.user.email,key:req.query.key},{$set:{name:req.query.name}});
    res.status(201).json({message:"Success"});
}));

router.put("/content",asyncHandler(async(req,res)=>{
    await Weeks.updateOne({email:req.user.email,key:req.body.key},{$set:{content:req.body.content}});
    res.status(201).json({message:"Success"});
}));

router.delete("/:key",asyncHandler(async(req,res)=>{
    await Weeks.deleteOne({key:req.params.key});
    res.status(204).json({message:"Success"});
}));

export default router;