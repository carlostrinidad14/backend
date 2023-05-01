import { Router } from "express";
import UsersManager from "../dao/usersManager.js";
const router = Router();
const usersManager = new UsersManager();
import { hashData } from "../utils.js";
import passport from "passport";

router.post("/registro", async (req, res) => {
  passport.authenticate("registro", {
    successRedirect: "/views/products",
    failureRedirect: "/views/errorRegistro",
  });
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/views/products",
    failureRedirect: "/views/errorLogin",
  })
);

router.get(
  "/signUpGithub",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github",
  passport.authenticate("github", { failureRedirect: "/views/errorLogin" }),
  (req, res) => {
    res.redirect("/views/products");
  }
);

//login y registro sin passport
/* router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await usersManager.loginUser({ email, password });
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

 router.post("/registro", async (req, res) => {
  const user = req.body;
  const hashPassword = await hashData(user.password);
  const newUser = {
    ...user,
    password: hashPassword,
  };
  await usersManager.createUser(newUser);
  if (newUser) {
    res.redirect("/views");
  } else {
    res.redirect("/views/errorRegistro");
  }
}); */

export default router;
