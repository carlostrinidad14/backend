import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const productManager = new ProductManager("./data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("¡Bienvenido a nuestro servidor de productos!");
});

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  let result = products.slice(0, limit);
  res.json({ productos: result });
});

app.get("/products/:id", async (req, res) => {
  const producto = await productManager.getProductById(parseInt(req.params.id));
  if (!producto) {
    res.status(404).send("Producto no encontrado");
  }
  res.send(producto);
});

app.post("/products", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;

  const newProduct = await productManager.addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );
  res.json({ menssage: "Producto creado", product: newProduct });
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
