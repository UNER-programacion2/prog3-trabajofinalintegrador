//import { registroClienteRouter } from "../routes/registroR.js";
import registroClienteServicios from "../servicios/registroClienteServices.js";

export default class registroClienteController {
    constructor() {
        this.registroClienteServicios = new registroClienteServicios();
    }

    // POST /usuarios
  postCliente = async (req, res) => {
    try {
      const { nombre, apellido, nombre_usuario, contrasenia } = req.body;

      if (!nombre || !apellido || !nombre_usuario || !contrasenia ) {
        return res.status(400).json({
          ok: false,
          mensaje: "Faltan campos requeridos.",
        });
      }

      const result = await this.registroClienteServicios.createCliente({
        nombre,
        apellido,
        nombre_usuario,
        contrasenia
      });

      res.status(201).json({
        ok: true,
        mensaje: `Cliente creado con id ${result.insertId}.`,
      });
    } catch (error) {
      console.log("Error en POST /registro", error);
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          ok: false,
          mensaje: "El nombre(email) de usuario ya existe.",
        });
      }
      res.status(500).json({ ok: false, mensaje: "Error interno del servidor." });
    }
  };

}