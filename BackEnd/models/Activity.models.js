import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  email: String,
  name: String,
  startTime: String,
  endTime: String,
  week: String
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;