class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son requeridos");
    }

    if (this.products.some((product) => product.code === code)) {
      console.log("Ya existe un Producto con el mismo codigo: " + code);
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
  }

  getProductById(id) {
    this.products.find((product) => product.id === id)
      ? console.log(this.products.find((product) => product.id === id))
      : console.log("Not Found");
  }

  getProducts() {
    return this.products;
  }
}

//Pruebas
instancia = new ProductManager();

console.log("Productos", instancia.getProducts());

instancia.addProduct(
  "Prodcto Prueba",
  "Este es un producto de prueba",
  200,
  "Sin Imagen",
  "abc123",
  25
);

console.log("Productos", instancia.getProducts());

instancia.addProduct(
  "Prodcto Prueba",
  "Este es un producto de prueba",
  200,
  "Sin Imagen",
  "abc123",
  25
);

instancia.getProductById(99);

instancia.getProductById(1);
