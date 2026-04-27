import mongoose from "mongoose";

const weeksSchema = new mongoose.Schema({
  email: String,
  key: String,
  name: String,
  content: String
});

export default mongoose.model("Weeks", weeksSchema);