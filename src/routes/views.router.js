import { Router } from "express";
//import ProductManager from "../DAL/dao/productManagerFS.js";
import ProductManager from "../DAL/dao/productManagerMongo.js";
import CartManager from "../DAL/dao/cartManagerMongo.js";
import { __dirname } from "../utils.js";
import { productsModel } from "../DAL/dao/models/products.model.js";
import mongoose from "mongoose";

const router = Router();
const productManager = new ProductManager(__dirname + "/data.json");
const cartManager = new CartManager("../src/carts.json");
import passport from "passport";

/* router.get("/", async (req, res) => {
  const products = await productManager.getProducts();

  res.render("home", { products });
}); */

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

router.get("/chat", (req, res) => {
  res.render("chat");
});

router.get("/products", async (req, res) => {
  const email = req.user.email;
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
      prevPage: `http://localhost:8080/views/products?limit=${limit}&page=${info.prevPage}`,

      nextPage: `http://localhost:8080/views/products?limit=${limit}&page=${info.nextPage}`,
      email: email,
    });
  } catch (error) {
    console.log(error);
    res.render("error");
  }
});

router.get("/carts/:id", async (req, res, next) => {
  try {
    const { id, products } = await cartManager.getCartById(req.params.id);
    if (!id) {
      res.status(404).send("Carro no encontrado");
    }

    res.render("carts", { id, products });
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res) => {
  if (req.session.email) {
    res.redirect("/views/perfil");
    return;
  }
  res.render("login");
});

router.get("/registro", (req, res) => {
  res.render("registro");
});

router.get("/errorRegistro", (req, res) => {
  res.render("errorRegistro");
});

router.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

router.get("/perfil", (req, res) => {
  if (!req.session.email) {
    res.redirect("/views");
    return;
  }
  res.render("perfil", { email: req.session.email });
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  req.session.destroy(() => {
    res.redirect("/views");
  });
});

export default router;
