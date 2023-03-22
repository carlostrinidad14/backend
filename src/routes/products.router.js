import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const productManager = new ProductManager("../src/data.json");

// Obtener todos los productos
router.get("/", async (req, res, next) => {
  try {
    const products = await productManager.getProducts();
    let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    let result = products.slice(0, limit);
    res.json({ productos: result });
  } catch (error) {
    next(error);
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res, next) => {
  try {
    const producto = await productManager.getProductById(
      parseInt(req.params.id)
    );
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
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;

    // Validar que se han enviado todos los campos requeridos
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      res.status(400).send("Faltan campos requeridos");
      return;
    }

    const newProduct = await productManager.addProduct(
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail
    );
    res.json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    next(error);
  }
});

// Actualizar un producto existente
router.put("/:id", async (req, res, next) => {
  try {
    const producto = await productManager.getProductById(
      parseInt(req.params.id)
    );
    const updateData = req.body;
    if (!producto) {
      res.status(404).send("Producto no encontrado");
    }
    const newUpdatedProduct = { ...producto, ...updateData };
    await productManager.updateProduct(producto.id, newUpdatedProduct);
    res.send(`Producto con el id ${producto.id} actualizado`);
  } catch (error) {
    next(error);
  }
});

// Eliminar un producto existente
router.delete("/:id", async (req, res, next) => {
  try {
    const producto = await productManager.getProductById(
      parseInt(req.params.id)
    );
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
