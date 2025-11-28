import mongoose from "mongoose";

const { Schema } = mongoose;

const activitySchema = new Schema({
  title: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }], // POPULATE requires this (see API)
  area: { type: String },
  country: { type: String },
  description: { type: String },
  imageUrl: { type: String },
});

const Activity =
  mongoose.models.Activity || mongoose.model("Activity", activitySchema);

export default Activity;
