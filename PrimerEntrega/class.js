const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.#loadFromFile();
  }

  addProduct(title, description, price, thumbnail, code, stock) {
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
    this.#saveToFile();
  }

  deleteProduct(id) {
    if (!this.products.some((product) => product.id === id)) {
      console.log("El producto con ese ID no existe ID: " + id);
      return "El producto con ese ID no existe" + id;
    } else {
      this.products = this.products.filter((product) => product.id !== id);
      this.#saveToFile();
    }
  }

  getProductById(id) {
    let product = this.products.find((product) => product.id === id);
    return product ? product : "Not found";
  }

  getProducts() {
    return this.products;
  }

  updateProduct(id, updatedProduct) {
    let productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
      this.products[productIndex] = {id, ...updatedProduct  };
      this.#saveToFile();
    }
  }

  #saveToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

  #loadFromFile() {
    try {
      const data = fs.readFileSync(this.path);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
}

//Pruebas
const instancia = new ProductManager("datos.json");

console.log("Productos", instancia.getProducts());

instancia.addProduct(
  "Producto Prueba",
  "Este es un producto de prueba",
  200,
  "Sin Imagen",
  "abc123",
  25
);

instancia.addProduct(
  "Producto Prueba 2",
  "Este es otro producto de prueba",
  500,
  "Sin Imagen",
  "abc123456",
  20
);

instancia.addProduct(
  "Producto Prueba 3",
  "Este es otro producto de prueba",
  500,
  "Sin Imagen",
  "abcdefg123456",
  20
);

console.log("Productos", instancia.getProducts());

//Add Product con el mismo code para verificar que no se puede crear dos prod con mismo code
instancia.addProduct(
  "Prodcto Prueba",
  "Este es un producto de prueba",
  200,
  "Sin Imagen",
  "abc123",
  25
);

console.log(instancia.getProductById(99));

console.log(instancia.getProductById(2));

console.log("Productos", instancia.getProducts());

instancia.deleteProduct(1);
instancia.deleteProduct(2);

console.log("Productos despues de borrar", instancia.getProducts());

instancia.updateProduct(3, {
  title: "Producto Prueba 3 actualizado ",
  description: "Este es otro producto de prueba",
  price: 500,
  thumbnail: "Sin Imagen",
  code: "abcdefg123456",
  stock: 20,
});

console.log("Productos despues de actualizar", instancia.getProducts());