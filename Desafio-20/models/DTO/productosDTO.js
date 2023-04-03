export default class ProductoDTO {
    constructor({id, title, price, thumb}) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumb = thumb;
    }
}

export function transformarADTO(productos) {
    if(Array.isArray(productos)) {
        return productos.map( producto => new ProductoDTO(producto));
    } else {
        return new ProductoDTO(productos)
    }
}
