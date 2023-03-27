import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cluster from "cluster";
import compression from "compression";
import logger from "./logger/logger.js";
import routes from "./routes/routes.js";
import numCPUs from "os";
import mongoConnect from "./services/mongoConnect.js";
import ioController from "./controllers/ioController.js";


dotenv.config();

const loggerConsole = logger.getLogger(`default`);
const loggerArchiveWarn = logger.getLogger(`warnArchive`);

const envPort = parseInt(process.argv[2]) || 8080;
const PORT = process.env.PORT || envPort;

if (cluster.isMaster) {
  console.log(numCPUs);
  console.log(`PID number: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died: ${new Date().toString()}`);
    cluster.fork();
  });
} else {
  const app = express();

  const envPort = parseInt(process.argv[2]) || 8080;
  const PORT = process.env.PORT || envPort;

  app.listen(PORT, () => {
    loggerConsole.debug(
      `Servidor escuchando el puerto ${PORT} - PID: ${process.pid}`
    );
  });
}

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(cookieParser());

app.use(routes);

app.set("view engine", "ejs");
app.set("views", "./public/views");

app.use((req, res, next) => {
  loggerConsole.info(`
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);
  next();
});

app.use((req, res, next) => {
  loggerConsole.warn(`
    Estado: 404
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);

  loggerArchiveWarn.warn(
    `Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`
  );

  res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`,
  });
  next();
});

ioController.startChatServer(app, io);

httpServer.listen(PORT, async () => {
  console.log("Servidor escuchando en el puerto " + PORT);
  try {
    mongoConnect.connect();
  } catch (error) {
    console.log(`Error en conexión de Base de datos: ${error}`);
  }
});
