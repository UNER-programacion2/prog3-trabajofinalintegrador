import UsuariosDb from "../db/usuariosDB.js";

export default class UsuariosServicios {
  constructor() {
    this.UsuariosDb = new UsuariosDb();
  }

  getUsuarios = async (nombre_usuario, contrasenia) => {
    return await this.UsuariosDb.getUsuarios(nombre_usuario, contrasenia);
    
  };

  getAllUsuarios = async (usuario) => {
    const usuarioReq = usuario.tipo_usuario;

    // if (usuarioReq === 2){
    //   await this.UsuariosDb.getAllClientes()
    // }
    // else{
    //   await this.UsuariosDb.getAllUsuarios()
    // }

    const usuarioR = usuarioReq < 2
          ? await this.UsuariosDb.getAllUsuarios()
          : await this.UsuariosDb.getAllClientes()
  
    return usuarioR;
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