import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  //METODO PARA AGREGAR UN PRODUCTO A LA LISTA DE PRODUCTOS
  async addProduct(
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnail = []
  ) {
    this.products = await this.#loadFromFile();
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category
    ) {
      throw new Error(
        "Todos los campos son obligatorios, a excepcion de Thumbnails"
      );
    }

    if (this.products.some((product) => product.code === code)) {
      throw new Error(`Ya existe un Producto con el mismo código: ${code}`);
    }

    const id =
      this.products.length === 0
        ? 1
        : this.products[this.products.length - 1].id + 1;

    const newProduct = {
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    };

    this.products.push(newProduct);
    await this.#saveToFile();
  }

  // METO PARA ELIMINAR PRODUCTO POR ID
  async deleteProduct(id) {
    this.products = await this.#loadFromFile();
    if (!this.products.some((product) => product.id === id)) {
      console.log("El producto con ese ID no existe ID: " + id);
      return "El producto con ese ID no existe" + id;
    } else {
      this.products = this.products.filter((product) => product.id !== id);
      await this.#saveToFile();
    }
  }

  //METODO PARA OBTENER UN PRODUCTO POR ID
  async getProductById(id) {
    this.products = await this.#loadFromFile();
    let product = this.products.find((product) => product.id === id);
    return product ? product : false;
  }

  //METODO PARA OBTENER TODOS LOS PRODUCTOS
  async getProducts() {
    if (fs.existsSync(this.path)) {
      this.products = await this.#loadFromFile();
      return this.products;
    } else {
      return [];
    }
  }

  //METODO PARA ACTUALIZAR UN PRODUCTO
  async updateProduct(id, updatedProduct) {
    this.products = await this.#loadFromFile();
    let productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { id, ...updatedProduct };
      await this.#saveToFile();
    }
  }

  async #saveToFile() {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 4)
    );
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
