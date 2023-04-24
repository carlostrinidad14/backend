import { Router } from "express";
import UsersManager from "../dao/usersManager.js";
const router = Router();
const usersManager = new UsersManager();

router.post("/registro", async (req, res) => {
  const newUser = await usersManager.createUser(req.body);
  if (newUser) {
    res.redirect("/views");
  } else {
    res.redirect("/views/errorRegistro");
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersManager.loginUser(req.body);
  if (user) {
    req.session.email = email;
    req.session.password = password;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.admin = true;
    } else {
      req.session.admin = false;
    }
    res.redirect("/views/products");
  } else {
    res.redirect("/views/errorLogin");
  }
});
export default router;
