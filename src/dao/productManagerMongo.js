import { productsModel } from "./models/products.model.js";

export default class ProductManager {
  //METODO PARA AGREGAR UN PRODUCTO A LA LISTA DE PRODUCTOS
  async addProduct(product) {
    try {
      const newProduct = await productsModel.create(product);

      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  // METO PARA ELIMINAR PRODUCTO POR ID
  async deleteProduct(id) {
    try {
      const deletedProduct = await productsModel.deleteOne({ _id: id });
      return deletedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  //METODO PARA OBTENER UN PRODUCTO POR ID
  async getProductById(id) {
    try {
      const allProducts = await productsModel.findById(id);
      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }

  //METODO PARA OBTENER TODOS LOS PRODUCTOS
  async getProducts() {
    try {
      const allProducts = await productsModel.find().lean();
      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }

  //METODO PARA ACTUALIZAR UN PRODUCTO
  async updateProduct(id, updatedProduct) {
    const filter = { _id: id };
    try {
      const allProducts = await productsModel.updateOne(filter, updatedProduct);
      return allProducts;
    } catch (error) {
      console.log(error);
    }
  }
}
