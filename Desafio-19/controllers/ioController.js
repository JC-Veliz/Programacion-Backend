import MensajesFactory from "../persistence/Factories/MensajesDAOFactory.js";
import { normalizar } from "../utils/utils.js";
import logger from "../logger/logger.js";
import MensajesRepository from "../persistence/Repositories/MensajesRepository.js";

const mensajesRepo = new MensajesRepository();

const mensajeDB = MensajesFactory.getDao();

const loggerArchiveError = logger.getLogger(`errorArchive`);

function startChatServer(app, io) {
  io.on("connection", async (socket) => {
    console.log("Un nuevo cliente se ha conectado");

    let mensajesBD;
    try {
      mensajesBD = await mensajesRepo.getAll();
      console.log(mensajesBD);
    } catch (err) {
      loggerConsole.error(`Error ${err}`);
      loggerArchiveError.error(`Error ${err}`);
    }

    const chat = {
      id: "mensajes",
      mensajes: mensajesBD,
    };

    const normalized = normalizar(chat);

    try {
      socket.emit("mensajes", normalized);

      socket.on("mimensaje", async (data) => {
        const nuevoMensaje = {
          id: socket.id,
          author: {
            id: data.email,
            nombre: data.nombre,
            apellido: data.apellido,
            edad: data.edad,
            alias: data.alias,
            avatar: data.avatar,
          },
          text: data.mensaje,
          fyh: data.fyh,
        };

        await mensajesRepo.save(nuevoMensaje);

        let msjs = await mensajesRepo.getAll();

        let normalizrReload = {
          id: "mensajes",
          mensajes: msjs,
        };

        let newChat = normalizar(normalizrReload);

        io.sockets.emit("mensajes", newChat);
      });
    } catch (err) {
      loggerConsole.error(`Error ${err}`);
      loggerArchiveError.error(`Error ${err}`);
    }
  });
}

export default { startChatServer };
