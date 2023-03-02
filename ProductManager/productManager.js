const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const products = await this.#loadFromFile();
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "Todos los campos son requeridos";
    }

    if (this.products.some((product) => product.code === code)) {
      console.log("Ya existe un Producto con el mismo codigo: " + code);
      return "Ya existe un Producto con el mismo codigo: " + code;
    }

    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;

    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    await this.#saveToFile();
  }

  async deleteProduct(id) {
    const products = await this.#loadFromFile();
    if (!this.products.some((product) => product.id === id)) {
      console.log("El producto con ese ID no existe ID: " + id);
      return "El producto con ese ID no existe" + id;
    } else {
      this.products = this.products.filter((product) => product.id !== id);
      await this.#saveToFile();
    }
  }

  async getProductById(id) {
    const products = await this.#loadFromFile();
    let product = this.products.find((product) => product.id === id);
    return product ? product : "Not found";
  }

  async getProducts() {
    const products = await this.#loadFromFile();
    return this.products;
  }

  async updateProduct(id, updatedProduct) {
    const products = await this.#loadFromFile();
    let productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { id, ...updatedProduct };
      await this.#saveToFile();
    }
  }

  async #saveToFile() {
    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  }

  async #loadFromFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
}

//Pruebas

const Prueba = async () => {
  const instancia = new ProductManager("data.json");
  console.log("Productos", await instancia.getProducts());
  await instancia.addProduct(
    "Producto Prueba",
    "Este es un producto de prueba",
    200,
    "Sin Imagen",
    "abc123",
    25
  );
  await instancia.addProduct(
    "Producto Prueba 2",
    "Este es otro producto de prueba",
    500,
    "Sin Imagen",
    "abc123456",
    20
  );

  await instancia.addProduct(
    "Producto Prueba 3",
    "Este es otro producto de prueba",
    500,
    "Sin Imagen",
    "abcdefg123456",
    20
  );
  console.log("Productos", await instancia.getProducts());

  //Add Product con el mismo code para verificar que no se puede crear dos prod con mismo code
  await instancia.addProduct(
    "Prodcto Prueba",
    "Este es un producto de prueba",
    200,
    "Sin Imagen",
    "abc123",
    25
  );

  console.log("Productos", await instancia.getProducts());

  await instancia.deleteProduct(1);
  await instancia.deleteProduct(2);
  console.log("Productos despues de borrar", await instancia.getProducts());

  //ID que no existe
  console.log(await instancia.getProductById(99));
  //ID que existe
  console.log(await instancia.getProductById(3));

  await instancia.updateProduct(3, {
    title: "Producto Prueba 3 actualizado ",
    description: "Este es otro producto de prueba",
    price: 500,
    thumbnail: "Sin Imagen",
    code: "abcdefg123456",
    stock: 20,
  });

  console.log("Productos despues de actualizar", await instancia.getProducts());
};

Prueba();
