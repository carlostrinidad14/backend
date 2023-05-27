
import ProductManager from "../DAL/dao/productManagerMongo.js";

const productManager = new ProductManager();

//funcion para obtener todos los productos
export const getAllProducts = async (limit, page, category, stock, sort) => {
    try {
      const products = await productManager.getAllProducts(limit, page, category, stock, sort);
      return products;
    } catch (error) {
      throw error;
    }
  };

//funcion para obtener un producto por id
export const getProductById = async (id) => {
    try {
        const product = await productManager.getProductById(id);
        if (!product) {
        throw new Error("Producto no encontrado");
        }
        return product;
    } catch (error) {
        throw error;
    }
    }

//funcion para crear un producto
export const addProduct = async (product) => {
    try {
        const newProduct = await productManager.addProduct(product);
        return newProduct;
    } catch (error) {
        throw error;
    }
    }

//funcion para actualizar un producto
export const updateProduct = async (id, product) => {
    try {
        const updatedProduct = await productManager.updateProduct(id, product);
        return updatedProduct;
    } catch (error) {
        throw error;
    }
    }

//funcion para eliminar un producto
export const deleteProduct = async (id) => {
    try {
        const deletedProduct = await productManager.deleteProduct(id);
        return deletedProduct;
    } catch (error) {
        throw error;
    }
    }



