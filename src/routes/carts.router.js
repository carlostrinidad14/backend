import { Router } from "express";
//import CartManager from "../dao/cartManagerFS.js";
import CartManager from "../dao/cartManagerMongo.js";
//import ProductManager from "../dao/productManagerFS.js";
import ProductManager from "../dao/productManagerMongo.js";

const router = Router();
const cartManager = new CartManager("../src/carts.json");
const productManager = new ProductManager("../src/data.json");

// GET de productos por ID de Cart
router.get("/:id", async (req, res, next) => {
  try {
    const cart = await cartManager.getCartById(req.params.id);
    if (!cart) {
      res.status(404).send("Carro no encontrado");
    }
    res.status(200).send(cart);
  } catch (error) {
    next(error);
  }
});

// Creo nuevo cart sin productos
router.post("/", async (req, res, next) => {
  try {
    const cart = await cartManager.newCart();
    res.status(200).json({ cart: cart });
  } catch (error) {
    next(error);
  }
});

// agregar product al cart
router.post("/:id/products/:pid", async (req, res, next) => {
  try {
    const cart = await cartManager.getCartById(req.params.id);
    if (!cart) {
      res.status(404).send("Carro no encontrado");
    }
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      res.status(404).send("El producto que desea agregar no está listado");
      return;
    }
    await cartManager.addProductToCart(req.params.id, req.params.pid);
    res.status(200).send("agregado");
  } catch (error) {
    next(error);
  }
});

export default router;
