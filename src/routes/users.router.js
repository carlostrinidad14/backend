//create users.router.js
// Path: backend\src\routes\users.router.js
// Objetivo: Rutas para usuarios
import { Router } from "express";
import passport from "passport";
import { createUser, loginUser } from "../controllers/users.controller.js";

const router = Router();

router.post(
  "/registro",
  async (req, res, next) => {
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
  },
  createUser
);
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/views/products",
    failureRedirect: "/views/errorLogin",
  }),
  loginUser
);

/*

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
); */

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

export default router;
//create users.model.js
//
