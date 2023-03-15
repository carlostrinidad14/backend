import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("¡Bienvenido a nuestro servidor de productos!");
});

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
