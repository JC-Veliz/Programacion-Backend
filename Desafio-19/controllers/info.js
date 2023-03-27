import numCPUs from "os";

const info = (req, res) => {
  const data = {
    directorioActual: process.cwd(),
    idProceso: process.pid,
    vNode: process.version,
    rutaEjecutable: process.execPath,
    sistemaOperativo: process.platform,
    cantProcesadores: numCPUs.cpus().length,
    memoria: JSON.stringify(process.memoryUsage().rss, null, 2),
  };
  return res.render("info", data);
};

export default { info };
