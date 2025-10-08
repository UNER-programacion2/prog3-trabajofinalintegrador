
import UsuariosServicios from "../servicios/usuariosServicios.js";

export default class UsuariosController {
  constructor() {
    this.UsuariosServicios = new UsuariosServicios();
  }

  getUsuarios = async (req, res) => {
    try {
      const usuarios = await this.UsuariosServicios.getUsuarios();
      res.json({ ok: true, usuarios });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor", error: error.message });
    }
  };

  getUsuarioConId = async (req, res) => {
    try {
      const id = parseInt(req.params.usuario_id);
      if (isNaN(id)) return res.status(400).json({ ok: false, mensaje: "ID inválido" });

      const usuario = await this.UsuariosServicios.getUsuarioConId(id);
      if (usuario.length === 0) return res.status(404).json({ ok: false, mensaje: "Usuario no encontrado" });

      res.json({ ok: true, usuario: usuario[0] });
    } catch (error) {
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
    }
  };

  addUsuario = async (req, res) => {
    try {
      const { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario } = req.body;
      if (!nombre || !apellido || !nombre_usuario || !contrasenia || !tipo_usuario)
        return res.status(400).json({ ok: false, mensaje: "Faltan campos requeridos" });

      const result = await this.UsuariosServicios.addUsuario(req.body);
      res.status(201).json({ ok: true, mensaje: `Usuario creado con ID ${result.insertId}` });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ ok: false, mensaje: `El nombre de usuario ya existe` });
      }
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
    }
  };
}