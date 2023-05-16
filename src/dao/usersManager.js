import { userModel } from "./models/users.model.js";
import { compareData } from "../utils.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils.js";
import cookieParser from "cookie-parser";

const secretKeyJWT = "secretKeyJWT";

export default class UsersManager {
  // funcion para crear usuario
  async createUser(user, res) {
    const { email, password } = user;
    try {
      // buscamos si existe un usuario con el mismo email
      const existeUsuario = await userModel.find({ email });
      if (existeUsuario.length === 0) {
        const newUser = await userModel.create(user);
        const token = generateToken({ userId: newUser._id });

        res.cookie("jwt", token, { httpOnly: true });

        return { user: newUser, token };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // funcion para loguear usuario
  async loginUser(user) { // Agrega el parámetro "res" para la respuesta HTTP
    const { email, password } = user;
    try {
      // buscamos el usuario por email
      const usuario = await userModel.findOne({ email });
      if (usuario) {
        // comparamos la password ingresada con la password hasheada
        const isMatch = await compareData(password, usuario.password);
        if (isMatch) {
          const token = generateToken({ userId: usuario._id });
  
         
          
          return { user: usuario, token };
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
