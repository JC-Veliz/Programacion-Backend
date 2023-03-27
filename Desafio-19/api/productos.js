import ContenedorMemoria from "../persistence/ContenedorMemoria.js";
import { generarProducto } from "../utils/utils.js";

class ApiProductosMock extends ContenedorMemoria {
  constructor() {
    super();
  }

  popular() {
    const nuevos = [];
    for (let i = 0; i < 5; i++) {
      const productoNuevo = generarProducto();
      const guardado = this.guardar(productoNuevo);
      console.log(this.listarTodos());
      nuevos.push(guardado);
    }
    return nuevos;
  }
}

export default ApiProductosMock;
