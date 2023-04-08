import mongoose, { Schema } from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: String,
      qty: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export const cartsModel = mongoose.model("Carts", cartsSchema);
