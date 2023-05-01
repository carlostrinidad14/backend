import { userModel } from "./models/users.model.js";
import { compareData } from "../utils.js";

export default class UsersManager {
  // funcion para crear usuario
  async createUser(user) {
    const { email, password } = user;
    try {
      // buscamos si existe un usuario con el mismo email
      const existeUsuario = await userModel.find({ email });
      if (existeUsuario.length === 0) {
        const newUser = await userModel.create(user);
        return newUser;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // funcion para loguear usuario
  async loginUser(user) {
    const { email, password } = user;
    try {
      // buscamos el usuario por email
      const usuario = await userModel.findOne({ email });
      if (usuario) {
        // comparamos la password ingresada con la password hasheada
        const isMatch = await compareData(password, usuario.password);
        if (isMatch) {
          return usuario;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
