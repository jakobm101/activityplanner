import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  title: { type: String, required: true },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
