import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  storeUsername: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: String,
  category: String,
  tags: Array,
  qty: {
    type: Number,
    default: 0,
  },
  price: Number,
  img: {
    type: String,
    default:
      "https://thumb9.shutterstock.com/mosaic_250/3702149/1436787446/stock-vector-lost-items-line-vector-icon-unidentified-items-outline-isolated-icon-1436787446.jpg",
  },
});

const ProductModel = mongoose.model("Products", ProductSchema);
export default ProductModel;
