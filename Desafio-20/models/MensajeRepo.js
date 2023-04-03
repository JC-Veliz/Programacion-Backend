export default class MensajeRepo {
  #author = {};
  #id;
  #fyh;
  #text;

  constructor(message) {
    this.#id = message.id;
    this.#author.id = message.author.id;
    this.#author.nombre = message.author.nombre;
    this.#author.apellido = message.author.apellido;
    this.#author.edad = message.author.edad;
    this.#author.alias = message.author.alias;
    this.#author.avatar = message.author.avatar;
    this.#fyh = message.fyh;
    this.#text = message.text;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    console.log(id);
    if (!id) throw new Error('"id" es un campo requerido');
    this.#id = id;
  }

  get author() {
    return this.#author;
  }

  set author(author) {
    console.log(author);
    if (!author) throw new Error('"author" es un campo requerido');
    this.#author = author;
  }

  get authorId() {
    return this.#author.id;
  }

  set authorId(id) {
    console.log(id);
    if (!id) throw new Error('"author.id" es un campo requerido');
    this.#author.id = id;
  }

  get authorNombre() {
    return this.#author.nombre;
  }

  set authorNombre(nombre) {
    console.log(nombre);
    if (!nombre) throw new Error('"author.nombre" es un campo requerido');
    this.#author.nombre = nombre;
  }

  get authorApellido() {
    return this.#author.apellido;
  }

  set authorApellido(apellido) {
    console.log(apellido);
    if (!apellido) throw new Error('"author.apellido" es un campo requerido');
    this.#author.apellido = apellido;
  }

  get authorEdad() {
    return this.#author.edad;
  }

  set authorEdad(edad) {
    console.log(edad);
    if (!edad) throw new Error('"author.edad" es un campo requerido');
    this.#author.edad = edad;
  }

  get authorAlias() {
    return this.#author.alias;
  }

  set authorAlias(alias) {
    console.log(alias);
    if (!alias) throw new Error('"author.alias" es un campo requerido');
    this.#author.alias = alias;
  }

  get authorAvatar() {
    return this.#author.avatar;
  }

  set authorAvatar(avatar) {
    console.log(avatar);
    if (!avatar) throw new Error('"author.avatar" es un campo requerido');
    this.#author.avatar = avatar;
  }

  get fyh() {
    return this.#fyh;
  }

  set fyh(fyh) {
    if (!fyh) throw new Error('"fyh" es un campo requerido');
    this.#fyh = fyh;
  }

  get text() {
    return this.#text;
  }

  set text(text) {
    console.log(text);
    if (!text) throw new Error('"text" es un campo requerido');
    this.#text = text;
  }

  datos() {
    return JSON.parse(
      JSON.stringify({
        id: this.#id,
        author: this.#author,
        fyh: this.#fyh,
        text: this.#text,
      })
    );
  }
}
