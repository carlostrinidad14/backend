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
  async getAllProducts(limit, page, category, stock, sort) {
    try {
      if (category && !stock) {
        const allProducts = await productsModel.paginate(
          { category: category },
          {
            limit,
            page,
            sort: { price: sort === "desc" ? -1 : 1 }, // ordena por precio ascendente (1) o descendente (-1) dependiendo del parámetro 'sort'
          }
        );
        const info = {
          count: allProducts.totalDocs,
          totalPages: allProducts.totalPages,
          nextPage: allProducts.nextPage,
          prevPage: allProducts.prevPage,
          page: allProducts.page,
          hasPrevPage: allProducts.hasPrevPage,
          hasNextPage: allProducts.hasNextPage,
          nextLink: allProducts.hasNextPage
            ? `http://localhost:8080/api/products?limit=${limit}&page=${allProducts.nextPage}`
            : null,
          prevLink: allProducts.hasPrevPage
            ? `http://localhost:8080/api/products?limit=${limit}&page=${allProducts.prevPage}`
            : null,
        };
        return { info, allProducts: allProducts.docs };
      } else if (category && stock) {
        const allProducts = await productsModel.paginate(
          { category: category, stock: stock },
          { limit, page, sort: { price: sort === "desc" ? -1 : 1 } }
        );
        return allProducts;
      } else if (stock && !category) {
        const allProducts = await productsModel.paginate(
          { stock: stock },
          { limit, page, sort: { price: sort === "desc" ? -1 : 1 } }
        );
        const info = {
          count: allProducts.totalDocs,
          totalPages: allProducts.totalPages,
          nextPage: allProducts.nextPage,
          prevPage: allProducts.prevPage,
          page: allProducts.page,
          hasPrevPage: allProducts.hasPrevPage,
          hasNextPage: allProducts.hasNextPage,
          nextLink: allProducts.hasNextPage
            ? `http://localhost:8080/api/products?limit=${limit}&page=${allProducts.nextPage}`
            : null,
          prevLink: allProducts.hasPrevPage
            ? `http://localhost:8080/api/products?limit=${limit}&page=${allProducts.prevPage}`
            : null,
        };
        return { info, allProducts: allProducts.docs };
      }
      if (limit) {
        const allProducts = await productsModel.paginate(
          {},
          { limit, page, sort: { price: sort === "desc" ? -1 : 1 } }
        );
        const info = {
          count: allProducts.totalDocs,
          totalPages: allProducts.totalPages,
          nextPage: allProducts.nextPage,
          prevPage: allProducts.prevPage,
          page: allProducts.page,
          hasPrevPage: allProducts.hasPrevPage,
          hasNextPage: allProducts.hasNextPage,
          nextLink: allProducts.hasNextPage
            ? `http://localhost:8080/api/products?limit=${limit}&page=${allProducts.nextPage}`
            : null,
          prevLink: allProducts.hasPrevPage
            ? `http://localhost:8080/api/products?limit=${limit}&page=${allProducts.prevPage}`
            : null,
        };
        return { info, allProducts: allProducts.docs };
      }
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
