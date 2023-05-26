import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  //METODO PARA AGREGAR CARRITO VACIO A LA LISTA DE CARROS
  async newCart(products = []) {
    this.carts = await this.#loadFromFile();
    const id =
      this.carts.length === 0 ? 1 : this.carts[this.carts.length - 1].id + 1;
    const newCart = {
      id,
      products,
    };

    this.carts.push(newCart);
    await this.#saveToFile();
  }

  // METODO PARA BUSCAR CARRITO POR ID
  async getCartById(id) {
    this.carts = await this.#loadFromFile();
    let cart = this.carts.find((cart) => cart.id === id);
    return cart ? cart : false;
  }

  // METODO PARA AGREGAR UN PRODUCTO AL CARRITO SELECCIONADO
  async addProductToCart(id, addedProductId) {
    this.carts = await this.#loadFromFile();

    const cart = this.carts.find((cart) => cart.id === id);

    if (cart) {
      const addedProductIndex = cart.products.findIndex(
        (product) => product.product === addedProductId
      );
      const addedProductQty =
        addedProductIndex !== -1
          ? (await cart.products[addedProductIndex].qty) + 1
          : 1;
      const addedProduct = { product: addedProductId, qty: addedProductQty };

      addedProductIndex !== -1
        ? await cart.products.splice(addedProductIndex, 1, addedProduct)
        : await cart.products.push(addedProduct);

      await this.#saveToFile();
    }
  }


  async #saveToFile() {
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 4));
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

/* const Prueba = async () => {
  const instancia = new CartManager("carts.json");
  console.log( await instancia.addProductToCart(1,3));
};

  Prueba(); 
  */
