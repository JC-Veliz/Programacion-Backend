export default class Mensaje {

    #id
    #email
    #name
    #lastname
    #age
    #alias
    #avatar
    #text
    #timestamp

    constructor({id, email, name, lastname, age, alias, avatar, text, timestamp}) {
        this.#id = id;
        this.#email = email;
        this.#name = name;
        this.#lastname = lastname;
        this.#age = age;
        this.#alias = alias;
        this.#avatar = avatar;
        this.#text = text;
        this.#timestamp = timestamp;

    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get lastname() {
        return this.#lastname;
    }

    set lastname(lastname) {
        this.#lastname = lastname;
    }

    get age() {
        return this.#age;
    }

    set age(age) {
        this.#age = age;
    }

    get email() {
        return this.#email;
    }

    set email(email) {
        this.#email = email;
    }

    get alias() {
        return this. alias;
    }

    set alias(alias) {
        this.#alias = alias;
    }

    get avatar() {
        return this.#avatar;
    }

    set avatar(avatar) {
        this.#avatar = avatar;
    }

    get text() {
        return this.#text;
    }

    set text(text) {
        this.#text = text;
    }

    get timestamp() {
        return this.#timestamp;
    }

    set timestamp(timestamp) {
        this.#timestamp = timestamp;
    }

    verMensaje() {
        return {id: this.#id, email: this.#email, name: this.#name, lastname: this.#lastname, age: this.#age, alias: this.#alias, avatar: this.#avatar, text: this.#text, timestamp: this.#timestamp};
    }

}