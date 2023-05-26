import CartManager from "../DAL/dao/cartManagerMongo.js";
import ProductManager from "../DAL/dao/productManagerMongo.js";

const cartManager = new CartManager();
const productManager = new ProductManager();

//funcion para obtener un carrito por id
export const getCartById = async (id) => {
    try {
        const cart = await cartManager.getCartById(id);
        if (!cart) {
        throw new Error("Carro no encontrado");
        }
        return cart;
    } catch (error) {
        throw error;
    }
    }

//funcion para crear un carrito vacio
export const newCart = async () => {
    try {
        const cart = await cartManager.newCart();
        return cart;
    } catch (error) {
        throw error;
    }
    }

//funcion para agregar un producto al carrito
export const addProductToCart = async (id, addedProductId) => {
    try {
        const cart = await cartManager.getCartById(id);
        if (!cart) {
        throw new Error("Carro no encontrado");
        }
        const product = await productManager.getProductById(addedProductId);
        if (!product) {
        throw new Error("El producto que desea agregar no está listado");
        }
        const addedProduct = await cartManager.addProductToCart(id, addedProductId);
        return addedProduct;
    } catch (error) {
        throw error;
    }
    }

//funcion para eliminar un producto del carrito
export const deleteProductFromCart = async (id, deletedProductId) => {
    try {
        const cart = await cartManager.getCartById(id);
        if (!cart) {
        throw new Error("Carro no encontrado");
        }
        const product = await productManager.getProductById(deletedProductId);
        if (!product) {
        throw new Error("El producto que desea eliminar no está listado");
        }
        const deletedProduct = await cartManager.deleteProductFromCart(id, deletedProductId);
        return deletedProduct;
    } catch (error) {
        throw error;
    }
    }

//funcion para vaciar el carrito
export const deleteCart = async (id) => {
    try {
        const cart = await cartManager.getCartById(id);
        if (!cart) {
        throw new Error("Carro no encontrado");
        }
        const deletedCart = await cartManager.deleteCart(id);
        return deletedCart;
    } catch (error) {
        throw error;
    }
    }

//funcion para obtener todos los carritos
export const getAllCarts = async () => {
    try {
        const carts = await cartManager.getAllCarts();
        return carts;
    } catch (error) {
        throw error;
    }
    }

//funcion para obtener todos los productos de un carrito
export const getAllProductsFromCart = async (id) => {
    try {
        const cart = await cartManager.getCartById(id);
        if (!cart) {
        throw new Error("Carro no encontrado");
        }
        const products = await cartManager.getAllProductsFromCart(id);
        return products;
    } catch (error) {
        throw error;
    }
    }

    