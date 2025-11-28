import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySchema = new Schema({
  title: { type: String, required: true },
});

const Activity= mongoose.models.Activity|| mongoose.model("Activity", activitySchema);

export default Activity;
