import { Router } from "express";
//import ProductManager from "../dao/productManagerFS.js";
import ProductManager from "../dao/productManagerMongo.js";
import { __dirname } from "../utils.js";

const router = Router();
const productManager = new ProductManager(__dirname + "/data.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();

  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

export default router;
