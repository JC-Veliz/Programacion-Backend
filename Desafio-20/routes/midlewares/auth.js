import { Router } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bCrypt from "bcrypt";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import UsuariosFactory from "../../persistence/Factories/UsuariosDAOFactory.js";

const router = Router();

dotenv.config();

const MONGO_DB_URI = process.env.URL_MONGO;
const usuariosDAO = UsuariosFactory.getDao();

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      const { direccion } = req.body;
      const findOrCreateUser = function () {
        usuariosDAO
          .getByUsername(username)
          .then((user) => {
            if (user) {
              console.log("User already exists");
              done(null, false);
            } else {
              const newUser = {
                username: username,
                password: createHash(password),
                direccion: direccion,
              };
              usuariosDAO
                .save(newUser)
                .then((savedUser) => {
                  done(null, savedUser);
                })
                .catch((error) => {
                  console.log("Error in SignUp: " + error);
                  done(error);
                });
            }
          })
          .catch((error) => {
            console.log("Error in SignUp: " + error);
            done(error);
          });
      };
      process.nextTick(findOrCreateUser);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await usuariosDAO.getByUsername(username);
        if (!user) {
          console.log("User Not Found with username " + username);
          return done(null, false);
        }
        if (!validatePassword(user, password)) {
          console.log("Invalid Password");
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

const validatePassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  usuariosDAO
    .getById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});

//SESSION

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

router.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_DB_URI,
      mongoOptions: advancedOptions,
    }),
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
    rolling: true,
  })
);

router.use(passport.initialize());
router.use(passport.session());

export default router;
