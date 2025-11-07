import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import path from "path";

export default class NotificacionesService {
  enviarCorreo = async (datosCorreo) => {
    try {
      const reserva = datosCorreo[0][0];
      const admins = datosCorreo[1];

      if (!reserva || !admins || admins.length === 0) {
        console.log("⚠️ No hay datos válidos para enviar el correo.");
        return;
      }

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const plantillaPath = path.join(__dirname, "../utils/plantilla.hbs");

      const contenidoPlantilla = await readFile(plantillaPath, "utf-8");
      const template = handlebars.compile(contenidoPlantilla);

     
      const html = template({
        fecha: reserva.fecha,
        salon: reserva.salon,
        turno: reserva.turno,
        tematica: reserva.tematica,
        inicio: reserva.inicio,
        fin: reserva.fin,
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      const destinatarios = admins.map((a) => a.correoAdmin).join(", ");

      const opciones = {
        from: process.env.USER,
        to: destinatarios,
        subject: "Nueva Reserva Registrada 🎉",
        html: html,
      };


      const info = await transporter.sendMail(opciones);
      console.log(`✅ Correo enviado correctamente a: ${destinatarios}`);
      console.log(`📬 ID del mensaje: ${info.messageId}`);

    } catch (error) {
      console.error("❌ Error enviando notificación por correo:", error);
    }
  };
}

