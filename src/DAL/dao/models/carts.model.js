import mongoose, { Schema } from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, // tipo de dato de la referencia
        ref: "Products", // nombre de la colección referenciada
      },
      qty: {
        type: Number,
        default: 1,
      },
      _id: false, // deshabilita la creación automática del campo _id para los objetos de "products"
    },
  ],
});

export const cartsModel = mongoose.model("Carts", cartsSchema);
