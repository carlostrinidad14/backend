import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { userModel } from "../dao/models/users.model.js";
import UsersManager from "../dao/usersManager.js";
const usersManager = new UsersManager();
import { hashData } from "../utils.js";

//Estrategia de passport para registro
passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = req.body;
      const hashPassword = await hashData(password);
      const newUser = {
        ...user,
        password: hashPassword,
      };
      const newUserDb = await usersManager.createUser(newUser, req.res); // Pasar req.res como argumento
      if (newUserDb) {
        return done(null, newUserDb);
      } else {
        return done(null, false);
      }
    }
  )
);

//estrategia de passport para login
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await usersManager.loginUser({ email, password });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);

//estrategia de passport para github
passport.use(
  new GithubStrategy(
    {
      clientID: "Iv1.235fc952fe449a6c",
      clientSecret: "b007105c739807ef99eddffa56a6782c9a68894a",
      callbackURL: "http://localhost:8080/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile._json.email;
      const user = await userModel.findOne({ email });
      if (user) {
        return done(null, user);
      } else {
        const newUser = {
          email: profile._json.email,
          password: "12345678",
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1],
          age: 18,
        };
        const userDb = await usersManager.createUser(newUser);
        return done(null, userDb);
      }
    }
  )
);




passport.serializeUser((user, done) => {
   done(null, user.user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
