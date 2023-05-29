// create user.services.js
// Path: backend\src\services\users.services.js
// Objetivo: Crear servicios para usuarios
import UsersManager from "../DAL/dao/usersManager.js";

const usersManager = new UsersManager();

export const createUser = async (user, res)=> {
  try {
    const newUser = await usersManager.createUser(user, res);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const loginUser = async (user, res)=> {
  try {
    const newUser = await usersManager.loginUser(user, res);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

