export default class ProductoDTO {
  constructor(producto) {
    this.title = producto.title;
    this.price = producto.price;
    this.description = producto.description;
    this.code = producto.code;
    this.image = producto.image;
    this.stock = producto.stock;
    this.timestamp = producto.timestamp;
  }
}

export function transformarADTO(productos) {
  if (Array.isArray(productos)) {
    return productos.map((p) => new ProductoDTO(p));
  } else {
    return new ProductoDTO(productos);
  }
}
