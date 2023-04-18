import { Router } from "express";
//import ProductManager from "../dao/productManagerFS.js";
import ProductManager from "../dao/productManagerMongo.js";
import { __dirname } from "../utils.js";
import { productsModel } from "../dao/models/products.model.js";
import mongoose from "mongoose";

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

router.get("/products", async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const category = req.query.category ? req.query.category : null;
  const stock = req.query.stock ? parseInt(req.query.stock) : null;
  const sort = req.query.sort ? req.query.sort : "asc";

  try {
    const { info, allProducts } = await productManager.getProducts(
      limit,
      page,
      category,
      stock,
      sort
    );
    res.render("products", {
      products: allProducts,
      prevLink: info.prevLink,
      nextLink: info.nextLink,
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

export default router;
