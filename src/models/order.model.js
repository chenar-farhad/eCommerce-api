import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
  },
  userId: {
    type: String,
  },
  qty: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  statuses: {
    type: Number,
    default: 0,
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
