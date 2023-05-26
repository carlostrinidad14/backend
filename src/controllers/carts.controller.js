//crear el controller de carts
//Path: backend\src\controllers\carts.controller.js
import * as CartServices from "../services/carts.services.js";

//funcion para obtener todos los carritos
export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await CartServices.getAllCarts();
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

//funcion para obtener todos los productos de un carrito
export const getAllProductsFromCart = async (req, res, next) => {
  try {
    const products = await CartServices.getAllProductsFromCart(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

//funcion para agregar un producto a un carrito
export const addProductToCart = async (req, res, next) => {
  try {
    const product = await CartServices.addProductToCart(
      req.params.id,
      req.params.pid
    );
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

//funcion para eliminar un producto de un carrito
export const deleteProductFromCart = async (req, res, next) => {
  try {
    const deletedProduct = await CartServices.deleteProductFromCart(
      req.params.id,
      req.params.pid
    );
    res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
};

//funcion para vaciar un carrito
export const deleteCart = async (req, res, next) => {
  try {
    const deletedCart = await CartServices.deleteCart(req.params.id);
    res.status(200).json(deletedCart);
  } catch (error) {
    next(error);
  }
};

//funcion para crear un nuevo carrito
export const newCart = async (req, res, next) => {
  try {
    const cart = await CartServices.newCart();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

//funcion para obtener un carrito por id
export const getCartById = async (req, res, next) => {
    try {
        const cart = await CartServices.getCartById(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
    }