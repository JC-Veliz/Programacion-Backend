//Validar si es administrador
let admin = true;

const authAdmin = (req, res, next) => {
    const metod = req.method;
    const ruta = req.originalUrl;
    if (admin) {
        next();
    } else {
        res.json({ error: -1, descripcion: `ruta ${ruta} método ${metod} no autorizada` })
    }
}

module.exports = authAdmin;