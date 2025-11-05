import UsuariosServicios from "../servicios/usuariosServicios.js";

export default class UsuariosController {
  constructor() {
    this.UsuariosServicios = new UsuariosServicios();
  }

  // GET /usuarios
  getUsuarios = async (req, res) => {
    try {
      const usuarios = await this.UsuariosServicios.getUsuarios();
      res.json({ ok: true, usuarios });
    } catch (error) {
      console.log("Error en GET /usuarios", error);
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
    }
  };


  getAllUsuarios = async (req, res) => {
    try {
      const usuarios = await this.UsuariosServicios.getAllUsuarios(); 
      res.status(200).json(usuarios);

    } catch (error) {
      console.error("Error en GET /usuarios", error);
      res.status(500).json({ message: "Error al obtener los usuarios." });
     }
  };
 
  // GET /usuarios/:usuario_id
  getUsuarioConId = async (req, res) => {
    try {
      const usuario_id = parseInt(req.params.usuario_id);
      if (isNaN(usuario_id))
        return res.status(400).json({ ok: false, mensaje: "ID inválido." });

      const usuario = await this.UsuariosServicios.getUsuarioConId(usuario_id);
      if (usuario.length === 0)
        return res.status(404).json({ ok: false, mensaje: "Usuario no encontrado." });

      res.json({ ok: true, usuario: usuario[0] });
    } catch (error) {
      console.log("Error en GET /usuarios/:usuario_id", error);
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
    }
  };

  // POST /usuarios
  postUsuario = async (req, res) => {
    try {
      const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario } = req.body;

      if (!nombre || !apellido || !nombre_usuario || !contrasenia || !tipo_usuario) {
        return res.status(400).json({
          ok: false,
          mensaje: "Faltan campos requeridos.",
        });
      }

      const result = await this.UsuariosServicios.postUsuario({
        nombre,
        apellido,
        nombre_usuario,
        contrasenia,
        tipo_usuario,
      });

      res.status(201).json({
        ok: true,
        mensaje: `Usuario creado con id ${result.insertId}.`,
      });
    } catch (error) {
      console.log("Error en POST /usuarios", error);
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          ok: false,
          mensaje: "El nombre de usuario ya existe.",
        });
      }
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
    }
  };

  // PUT /usuarios/:usuario_id
  putUsuario = async (req, res) => {
    try {
      const usuario_id = req.params.usuario_id;
      const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario } = req.body;

      if (!nombre || !apellido || !nombre_usuario || !contrasenia || !tipo_usuario) {
        return res.status(400).json({
          ok: false,
          mensaje: "Faltan campos requeridos.",
        });
      }

      const result = await this.UsuariosServicios.putUsuario(usuario_id, {
        nombre,
        apellido,
        nombre_usuario,
        contrasenia,
        tipo_usuario,
      });

      if (result.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          mensaje: "El usuario no existe o ya fue eliminado.",
        });
      }

      if (result.changedRows === 0) {
        return res.status(200).json({
          ok: true,
          mensaje: `No se realizaron cambios en el usuario ${usuario_id}.`,
        });
      }

      res.status(200).json({
        ok: true,
        mensaje: `Usuario modificado. ID ${usuario_id}.`,
      });
    } catch (error) {
      console.log("Error en PUT /usuarios/:usuario_id", error);
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
    }
  };

  // DELETE /usuarios/:usuario_id
  deleteUsuario = async (req, res) => {
    try {
      const usuario_id = req.params.usuario_id;
      const result = await this.UsuariosServicios.deleteUsuario(usuario_id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          mensaje: "El usuario no existe o ya fue eliminado.",
        });
      }

      res.status(200).json({
        ok: true,
        mensaje: `Usuario eliminado. ID ${usuario_id}.`,
      });
    } catch (error) {
      console.log("Error en DELETE /usuarios/:usuario_id", error);
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
    }
  };
}