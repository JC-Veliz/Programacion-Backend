export default class MensajeDTO {
  constructor(message) {
    this.author = {};
    this.id = message.id;
    this.author.id = message.author.id;
    this.author.nombre = message.author.nombre;
    this.author.apellido = message.author.apellido;
    this.author.edad = message.author.edad;
    this.author.alias = message.author.alias;
    this.author.avatar = message.author.avatar;
    this.fyh = message.fyh;
    this.text = message.text;
  }
}

export function transformarADTO(mensajes) {
  if (Array.isArray(mensajes)) {
    return mensajes.map((p) => new MensajeDTO(p));
  } else {
    return new MensajeDTO(mensajes);
  }
}
