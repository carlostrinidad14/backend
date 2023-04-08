import mongoose from "mongoose";

const URI =
  "mongodb+srv://carlostrinidad:coderHouse2023@cluster0.n3qmyw6.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("conectado a la DB"))
  .catch((error) => console.log(error));
