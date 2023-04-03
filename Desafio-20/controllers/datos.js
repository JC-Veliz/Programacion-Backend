import ApiProductosMock from "../api/productos.js";
import service from "../services/datos.js";

const apiProductos = new ApiProductosMock();

const datos = async (req, res) => {
  const productosFaker = await apiProductos.popular();

  //Sacar a service
  const usuario = service.getUser;

  res.render("inicio", {
    datos: usuario,
    productos: productosFaker,
  });
};

export default { datos };
