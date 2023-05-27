import { Router } from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct }  from "../controllers/products.controller.js";

const router = Router();

//obtener todos los productos
router.get("/", getAllProducts);

//obtener un producto por id
router.get("/:id", getProductById);

//crear un producto
router.post("/", addProduct);

//actualizar un producto
router.put("/:id", updateProduct);

//eliminar un producto
router.delete("/:id", deleteProduct);

export default router;
