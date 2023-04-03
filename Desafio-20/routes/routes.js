import { Router } from "express";
import authRouter from "./midlewares/auth.js";
import controller from "../controllers/index.js";
import controllerRandoms from "../controllers/randoms.js";
import controllerProducts from "../controllers/products.js";
import controllerInfo from "../controllers/info.js";
import controllerDatos from "../controllers/datos.js";
import controllerAuth from "../controllers/requireAuthentication.js";
import controllerLogin from "../controllers/login.js";
import controllerLogout from "../controllers/logout.js";
import controllerRegister from "../controllers/register.js";

const router = Router();
const randoms = Router();
const info = Router();
const datos = Router();
const login = Router();
const logout = Router();
const register = Router();
const productos = Router();

//register
register.get("/register", controllerRegister.register);
register.post("/register", controllerRegister.registerPost);
register.get("/failregister", controllerRegister.failregister);

//login
login.get("/login", controllerLogin.login);
login.post("/login", controllerLogin.loginPost);
login.get("/faillogin", controllerLogin.faillogin);

//logout
logout.get(`/logout`, controllerAuth.requireAuthentication, controllerLogout.logout);

//datos
datos.get("/datos", controllerAuth.requireAuthentication, controllerDatos.datos);

//info
info.get("/info", controllerInfo.info);

//numeros randoms
randoms.get(`/randoms`, controllerRandoms.randomsGet);
randoms.post(`/randoms`, controllerRandoms.randomsPost);

//products
productos.get("/product/:id?", controllerProducts.get);
productos.post("/product/", controllerProducts.post);
productos.put("/product/:id", controllerProducts.put);
productos.delete("/product/:id", controllerProducts.del);



router.get("/", controller.index);

router.use(authRouter);
router.use("/", datos);
router.use("/", info);
router.use("/", login);
router.use("/", logout);
router.use("/", register);
router.use("/", productos);
router.use("/api", randoms);

export default router;
