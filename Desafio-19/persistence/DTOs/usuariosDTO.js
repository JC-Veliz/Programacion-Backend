export default class UsuarioDTO {
  constructor({ _id, username, password, direccion }) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.direccion = direccion;
  }
}

export function transformarADTO(usuarios) {
  if (Array.isArray(usuarios)) {
    return usuarios.map((p) => new UsuarioDTO(p));
  } else {
    return new UsuarioDTO(usuarios);
  }
}
