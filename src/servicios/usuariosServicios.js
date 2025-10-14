import UsuariosDb from "../db/usuariosDB.js";

export default class UsuariosServicios {
  constructor() {
    this.UsuariosDb = new UsuariosDb();
  }

  getUsuarios = async () => {
    return await this.UsuariosDb.getUsuarios();
  };

  getUsuarioConId = async (id) => {
    return await this.UsuariosDb.getUsuarioConId(id);
  };

  postUsuario = async (data) => {
    return await this.UsuariosDb.postUsuario(data);
  };

  putUsuario = async (id, data) => {
    return await this.UsuariosDb.putUsuario(id, data);
  };

  deleteUsuario = async (id) => {
    return await this.UsuariosDb.deleteUsuario(id);
  };
}