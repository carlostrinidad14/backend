import { cartsModel } from "./models/carts.model.js";

export default class CartManager {
  //METODO PARA AGREGAR CARRITO VACIO A LA LISTA DE CARROS
  async newCart(cart) {
    try {
      const newCart = await cartsModel.create(cart);
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  // METODO PARA BUSCAR CARRITO POR ID
  async getCartById(id) {
    try {
      const cartByID = await cartsModel.findById(id).populate({
        path: "products.product",
        model: "Products",
      });
      return cartByID;
    } catch (error) {
      console.log(error);
    }
  }

  // METODO PARA AGREGAR UN PRODUCTO AL CARRITO SELECCIONADO

  async addProductToCart(id, addedProductId) {
    try {
      const cart = await cartsModel.findById(id);
      if (cart) {
        const addedProductIndex = cart.products.findIndex(
          (product) => product.product.toString() === addedProductId.toString()
        );

        const addedProductQty =
          addedProductIndex !== -1
            ? cart.products[addedProductIndex].qty + 1
            : 1;

        const addedProduct = {
          product: addedProductId,
          qty: addedProductQty,
        };

        if (addedProductIndex !== -1) {
          cart.products[addedProductIndex] = addedProduct;
        } else {
          cart.products.push(addedProduct);
        }

        await cart.save();
        return addedProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // METODO PARA ELIMINAR UN PRODUCTO DE UN CARRITO SELECCIONADO
  async removeProductFromCart(id, productId) {
    try {
      const cart = await cartsModel.findById(id);
      if (cart) {
        const productIndex = cart.products.findIndex(
          (product) => product.product.toString() === productId.toString()
        );
        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1);
          await cart.save();
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  // METODO PARA ACTUALIZAR LA CANTIDAD DE UN PRODUCTO EN UN CARRITO
  async updateProductQtyInCart(id, productId, qty) {
    try {
      const cart = await cartsModel.findById(id);
      if (cart) {
        const productIndex = cart.products.findIndex(
          (product) => product.product.toString() === productId.toString()
        );
        if (productIndex !== -1) {
          cart.products[productIndex].qty = qty.qty;
          await cart.save();
          return cart.products[productIndex];
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

// METODO PARA ELIMINAR TODOS LOS PRODUCTOS DE UN CARRO
  async removeAllProductsFromCart(id) {
    try {
      const cart = await cartsModel.findById(id);
      if (cart) {
        cart.products = [];
        await cart.save();
        return { message: "Todos los elementos eliminados del carrito" };
      }
    } catch (error) {
      console.log(error);
    }
  }}
