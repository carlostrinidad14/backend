import { Router } from "express";
//import ProductManager from "../dao/productManagerFS.js";
import ProductManager from "../dao/productManagerMongo.js";

const router = Router();
const productManager = new ProductManager("../src/data.json");

// Obtener todos los productos
router.get("/", async (req, res, next) => {
  try {
    const { limit = 10, page = 1, category, stock, sort } = req.query;
    const products = await productManager.getProducts(
      limit,
      page,
      category,
      stock,
      sort
    );
    res.json({ productos: products });
  } catch (error) {
    next(error);
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res, next) => {
  try {
    const producto = await productManager.getProductById(req.params.id);
    if (!producto) {
      res.status(404).send("Producto no encontrado");
    }
    res.send(producto);
  } catch (error) {
    next(error);
  }
});

// Crear un nuevo producto
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    next(error);
  }
});

// Actualizar un producto existente
router.put("/:id", async (req, res, next) => {
  try {
    const producto = await productManager.getProductById(req.params.id);
    if (!producto) {
      res.status(404).send("Producto no encontrado");
    }
    await productManager.updateProduct(producto.id, req.body);
    res.send(`Producto con el id ${producto.id} actualizado`);
  } catch (error) {
    next(error);
  }
});

// Eliminar un producto existente
router.delete("/:id", async (req, res, next) => {
  try {
    const producto = await productManager.getProductById(req.params.id);
    if (!producto) {
      res.status(404).send("Producto no encontrado");
    }
    await productManager.deleteProduct(producto.id);
    res.send(
      `Producto con el id ${producto.id} eliminado, título del producto ${producto.title}`
    );
  } catch (error) {
    next(error);
  }
});

export default router;
