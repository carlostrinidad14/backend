// create users.controller.js
// Path: backend\src\controllers\users.controller.js
// Objetivo: Controlador de usuarios
import  * as UserServices from "../services/users.services.js";

export const createUser= async (req, res) => {
  try {
    const newUser = await UserServices.createUser(req.body, res);
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: "El usuario ya existe" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
}

export const loginUser = async (req, res) => {
  try {
    const newUser = await UserServices.loginUser(req.body, res);
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al loguear el usuario" });
  }
}
