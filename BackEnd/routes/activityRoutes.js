import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import Activity from "../models/Activity.models.js";

const router = express.Router();

router.get("/",asyncHandler(async (req, res) => {
    const email=req.user.email;
    const activities = await Activity.find({email});
    res.json(activities);
}));

router.get("/duplicateWeek",asyncHandler(async (req, res) => {
  const activities = await Activity.find({week:req.query.old});
  const newWeek=req.query.new;
  const duplicated=activities.map(act=>{
    const obj=act.toObject();
    delete obj._id;
    obj.week=newWeek;
    return obj;
  });
  const newActivities =await Activity.insertMany(duplicated);
  res.json(newActivities);
}));

router.post("/", asyncHandler(async (req, res) => {
  const email=req.user.email;
  const { name, startTime, endTime, week } = req.body;
  const newActivity = new Activity({
    email,
    name,
    startTime,
    endTime,
    week
  });
  await newActivity.save();
  res.json(newActivity);
}));

router.put("/:id",asyncHandler(async(req,res)=>{
  await Activity.findByIdAndUpdate(req.params.id,{$set:req.body});
  res.json({message:"Success"});
}));

router.delete("/",asyncHandler(async(req,res)=>{
  if(req.query.id){
    await Activity.findByIdAndDelete(req.query.id);
    res.json({message:"Success"});
  }
  else if(req.query.week){
    if(req.query.week=="daily"){
      const err=new Error("daily cannot be deleted");
      err.statusCode(400);
      throw err;
    }
    await Activity.deleteMany({week:req.query.week});
    res.json({message:"Success"});
  }
  else{
    const err = new Error("Provide id or week");
    err.statusCode = 400;
    throw err;
  }
}));

export default router;