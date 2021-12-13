import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
