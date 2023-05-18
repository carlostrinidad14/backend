import jwt from "jsonwebtoken";

export function jwtValidation(req, res, next) {
 
  const authorizationHeader = req.get("Authorization");
  const token = authorizationHeader.split(" ")[1];
  console.log(token);
  const isValid = jwt.verify(token, "secretKeyJWT");
  if (isValid) {
    console.log(isValid);
    req.user = isValid.user;
    next();
  } else {
    res.json({ message: "Error autenticacion" });
  }
}
