import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKeyJWT = "secretKeyJWT";

export const __dirname = dirname(fileURLToPath(import.meta.url));

// funcion para hashear data
export const hashData = async (data) => {
  return bcrypt.hash(data, 10);
};

// funcion para comparar data hasheada
export const compareData = async (data, hash) => {
  return bcrypt.compare(data, hash);
};

// funcion para generar token
export const generateToken = (user) => {
  const token = jwt.sign({ user, userId: user._id }, secretKeyJWT, {
    expiresIn: "1h",
  });
 /*  console.log(user); */
  return token;
};
