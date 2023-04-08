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
      const cartByID = await cartsModel.findById(id);
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
          (product) => product.product === addedProductId
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
      }
    } catch (error) {
      console.log(error);
    }
  }
}
