// export default class Producto {

//     #id
//     #title
//     #price
//     #thumb

//     constructor({id, title, price, thumb}) {
//         this.#id = id;
//         this.#title = title;
//         this.#price = price;
//         this.#thumb = thumb;
//     }

//     get id() {
//         return this.#id;
//     }

//     set id(id) {
//         this.#id = id;
//     }

//     get title() {
//         return this.#title;
//     }

//     set title(title) {
//         this.#title = title;
//     }

//     get price() {
//         return this.#price;
//     }

//     set price(price) {
//         this.#price = price;
//     }

//     get thumb() {
//         return this.#thumb;
//     }

//     set thumb(thumb) {
//         this.#thumb = thumb;
//     }

//     verProducto() {
//         return {id: this.#id, title: this.#title, price: this.#price, thumb: this.#thumb};
//     }

//     test() {
//         console.log("TEST")
//     }
// }

export default class Producto {

    id
    title
    price
    thumb

    constructor({id, title, price, thumb}) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumb = thumb;
    }

    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }

    get title() {
        return this.title;
    }

    set title(title) {
        this.title = title;
    }

    get price() {
        return this.price;
    }

    set price(price) {
        this.price = price;
    }

    get thumb() {
        return this.thumb;
    }

    set thumb(thumb) {
        this.thumb = thumb;
    }

    verProducto() {
        return {id: this.id, title: this.title, price: this.price, thumb: this.thumb};
    }

    test() {
        console.log("TEST")
    }
}