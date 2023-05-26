import { Router } from "express";
import UsersManager from "../DAL/dao/usersManager.js";
const router = Router();
const usersManager = new UsersManager();
import { hashData } from "../utils.js";
import passport from "passport";

router.post("/registro", async (req, res, next) => {
  passport.authenticate("registro", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/views/errorRegistro");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/views/products");
    });
  })(req, res, next);
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

router.get("/current", (req, res, next) => {
  passport.authenticate("current", { session: false }, (err, user, info) => {
    if (err) {
      // Si hay un error durante la autenticación, devolver el error
      return next(err);
    }

    if (!user) {
      // Si no se encuentra un usuario autenticado, devolver un error de autenticación
      return res.status(401).json({ message: "Usuario no autorizado" });
    }

    // Si se encuentra un usuario autenticado, devolver los datos del usuario
    res.json({ user });
  })(req, res, next);
});

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
