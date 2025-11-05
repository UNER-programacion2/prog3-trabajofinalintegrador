import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

export default class NotificacionesService {
    enviarCorreo = async (datosCorreo) => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const plantillaPath = path.join(process.cwd(), 'src/utils/plantilla.hbs');


        const plantilla = fs.readFileSync(plantillaPath, "utf-8");
        const template = handlebars.compile(plantilla);

        const datos = {
            fecha: datosCorreo[0][0].fecha,
            salon: datosCorreo[0][0].salon,
            turno: datosCorreo[0][0].turno,
        };

        const correoHtml = template(datos);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const correosAdmin = datosCorreo[1].map((a) => a.correoAdmin);
        const destinatarios = correosAdmin.join(", ");

        const mailOptions = {
            from: process.env.CORREO,
            to: destinatarios,
            subject: "Nueva Reserva Registrada",
            html: correoHtml,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("✅ Correo enviado correctamente a:", destinatarios);
        } catch (error) {
            console.error("❌ Error enviando el correo:", error);
        }
    };
}
