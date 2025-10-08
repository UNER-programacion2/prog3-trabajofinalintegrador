import UsuariosDb from "../db/usuariosdb.js";

export default class UsuariosServicios {
  constructor() {
    this.UsuariosDb = new UsuariosDb();
  }

  getUsuarios = () => this.UsuariosDb.getUsuarios();

  getUsuarioConId = async (id) => {
    const usuarios = await this.UsuariosDb.getUsuarioConId(id);
    return usuarios;
  };

  addUsuario = async (datos) => {
    return await this.UsuariosDb.addUsuario(datos);
  };

  deleteUsuario = async (id) => {
    return await this.UsuariosDb.deleteUsuario(id);
  };
}