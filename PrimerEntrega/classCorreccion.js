class ProductManager {
    constructor() {
      this.products = [];
    }
  
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        // Tener en cuenta que la función debe devolver el producto encontrado, en lugar de mostrarlo por consola
        // console.log("Todos los campos son requeridos");
        return "Todos los campos son requeridos";
      }
  
  
      if (this.products.some((product) => product.code === code)) {
        // Tener en cuenta que la función debe devolver el producto encontrado, en lugar de mostrarlo por consola
        // console.log("Ya existe un Producto con el mismo codigo: " + code);
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
  
  
    getProductById(id) {
      // Tener en cuenta que la función debe devolver el producto encontrado, en lugar de mostrarlo por consola
      // Podemos mejorar nuestro codigo, para no utilizar el metodo find() 2 veces (imaginar si buscara 2 veces el mismo producto en una base de datos con 1 millon de registros)
  
  
      let product = this.products.find(product => product.id === id)
      return product ? product : 'Not found';
  
  
      // this.products.find((product) => product.id === id)
        // ? console.log(this.products.find((product) => product.id === id))
        // : console.log("Not Found");
    }
  
  
    getProducts() {
      return this.products;
    }
  }
  
  
  //Pruebas
  // instancia = new ProductManager();
  const instancia = new ProductManager();
  
  
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
  
  
  // Este segundo llamado, no estaba agregando el producto ya que el code es igual al anterior
  instancia.addProduct(
    "Prodcto Prueba",
    "Este es un producto de prueba",
    200,
    "Sin Imagen",
    "abc1234",
    25
  )
  
  
  // instancia.getProductById(99);
  console.log(instancia.getProductById(99))
  
  
  // instancia.getProductById(1);
  console.log(instancia.getProductById(1))
  
  
  console.log("Productos", instancia.getProducts());