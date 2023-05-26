import mongoose from "mongoose";
import config from "../../config.js";

const URI = config.uri;

mongoose
  .connect(URI)
  .then(() => console.log("conectado a la DB"))
  .catch((error) => console.log(error));
