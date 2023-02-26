class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "Todos los campos son requeridos";
    }

    if (this.products.some((product) => product.code === code)) {
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
  }

 
  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }

  getProductById(id) {
    let product = this.products.find((product) => product.id === id);
    return product ? product : "Not found";
  }

  getProducts() {
    return this.products;
  }
}

//Pruebas
const instancia = new ProductManager();

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

console.log(instancia.getProductById(1));

console.log("Productos", instancia.getProducts());


instancia.deleteProduct(1)

console.log("Productos despues de borrar", instancia.getProducts());