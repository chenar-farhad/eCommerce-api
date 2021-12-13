import { urlencoded } from "express";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
    default: "https://www.myestate.sg/images/portrait-placeholder.png",
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
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
