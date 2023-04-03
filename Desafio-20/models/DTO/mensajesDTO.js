export default class MensajeDTO {
    constructor({id, email, name, lastname, age, alias, avatar, text, timestamp}) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.alias = alias;
        this.avatar = avatar;
        this.text = text;
        this.timestamp = timestamp;
    }
}

export function transformarADTO(mensajes) {
    if(Array.isArray(mensajes)) {
        return mensajes.map( mensaje => new MensajeDTO(mensaje));
    } else {
        return new MensajeDTO(mensajes)
    }
}