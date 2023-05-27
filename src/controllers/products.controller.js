import * as ProductServices from "../services/products.services.js";

//funcion para obtener todos los productos
export const getAllProducts = async (req, res, next) => {
  try {
    const { limit = 10, page = 1, category, stock, sort } = req.query;

    const products = await ProductServices.getAllProducts(
      limit,
      page,
      category,
      stock,
      sort
    );
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

//funcion para obtener un producto por id
export const getProductById = async (req, res, next) => {
  try {
    const product = await ProductServices.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

//funcion para crear un producto
export const addProduct = async (req, res, next) => {
  try {
    const product = await ProductServices.addProduct(req.body);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

//funcion para actualizar un producto
export const updateProduct = async (req, res, next) => {
  try {
    const product = await ProductServices.updateProduct(
      req.params.id,
      req.body
    );
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

//funcion para eliminar un producto
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductServices.deleteProduct(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
