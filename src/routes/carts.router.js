
import { Router } from "express";
import { getAllCarts, getAllProductsFromCart, addProductToCart, deleteProductFromCart, deleteCart, newCart, getCartById }  from "../controllers/carts.controller.js";

const router = Router();

//obtener todos los carritos

router.get("/", getAllCarts);

//obtener todos los productos de un carrito
router.get("/:id", getCartById);

//agregar un producto a un carrito
router.post("/:id/:pid", addProductToCart);

//crear un carrito
router.post("/", newCart);

//eliminar un producto de un carrito
router.delete("/:id/:pid", deleteProductFromCart);

//vaciar un carrito
router.delete("/:id", deleteCart);

export default router;
