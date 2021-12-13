import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  address: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png",
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  phone2: {
    type: String,
  },
  verify: {
    type: Number,
    default: 0,
  },
});

const StoreModel = mongoose.model("Store", StoreSchema);
export default StoreModel;
