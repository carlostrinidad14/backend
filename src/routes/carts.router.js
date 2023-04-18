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
    let cart = await cartManager.getCartById(req.params.id);
    if (!cart) {
      res.status(404).send("Carro no encontrado");
    }
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      res.status(404).send("El producto que desea agregar no está listado");
      return;
    }
    await cartManager.addProductToCart(req.params.id, req.params.pid);
    cart = await cartManager.getCartById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

// Eliminar product de un cart
router.delete("/:id/products/:pid", async (req, res, next) => {
  try {
    let cart = await cartManager.getCartById(req.params.id);
    if (!cart) {
      res.status(404).send("Carro no encontrado");
    }
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      res
        .status(404)
        .send("El producto que desea eliminar no está en el carro");
      return;
    }
    await cartManager.removeProductFromCart(req.params.id, req.params.pid);
    cart = await cartManager.getCartById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

// Actualizar la qty de un product de un cart
router.put("/:id/products/:pid", async (req, res, next) => {
  try {
    let cart = await cartManager.getCartById(req.params.id);
    if (!cart) {
      res.status(404).send("Carro no encontrado");
    }
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      res
        .status(404)
        .send("El producto que desea actualizar no está en el carro");
      return;
    }
    await cartManager.updateProductQtyInCart(req.params.id, req.params.pid, req.body);
    cart = await cartManager.getCartById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

// Eliminar product de un cart
router.delete("/:id", async (req, res, next) => {
  try {
    let cart = await cartManager.getCartById(req.params.id);
    if (!cart) {
      res.status(404).send("Carro no encontrado");
    }
    await cartManager.removeAllProductsFromCart(req.params.id);
    cart = await cartManager.getCartById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

export default router;
