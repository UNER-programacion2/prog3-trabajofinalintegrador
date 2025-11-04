import puppeteer from "puppeteer";
import { Parser } from "json2csv";
import fs from "fs";
import ReservasServicios from "../servicios/reservas.js"

export default class ReportesController {
  
  constructor() {
    this.ReservasServicios = new ReservasServicios();
  }

  // GET /api/reportes/reservas?formato=pdf|csv
  generarReporte = async (req, res) => {

      try {
      
        const { formato } = req.query;
        const usuarioArray = req.user;
        if (!usuarioArray || usuarioArray.length === 0) {
            return res.status(401).json({ estado: false, mensaje: 'Usuario no autenticado.' });
          }
      
          const usuario = usuarioArray[0];

      // 🔹 Ejemplo: obtener datos desde tu capa de servicio o BD
      const reservas = await this.ReservasServicios.getAllReservas(usuario); 

      if (!reservas || reservas.length === 0)
        return res.status(404).send("No hay reservas registradas");

      switch (formato) {
        case "pdf":
          return await this.generarPDF(reservas, res);
        case "csv":
          return this.generarCSV(reservas, res);
        default:
          return res.status(400).send("Formato no soportado (usa ?formato=pdf o ?formato=csv)");
      }
    } catch (err) {
      console.error("Error generando reporte:", err);
      res.status(500).send("Error interno al generar el reporte");
    }
  };

  // generar PDF con Puppeteer
  generarPDF = async (reservas, res) => {
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; color: #444; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <h1>Reporte de Reservas</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Salón</th>
                <th>Fecha</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Usuario</th>
                <th>Importe Total</th>
              </tr>
            </thead>
            <tbody>
              ${reservas
                .map(
                  (r) => `
                <tr>
                   <td>${r.reserva_id}</td>
                    <td>${r.nombre_salon || "Sin dato"}</td>
                    <td>${r.fecha_reserva}</td>
                    <td>${r.hora_desde}</td>
                    <td>${r.hora_hasta}</td>
                    <td>${r.usuario || "Anónimo"}</td>
                    <td>$${Number(r.importe_total || 0).toFixed(2)}</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=reporte_reservas.pdf",
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  };

  // generar CSV
  generarCSV = (reservas, res) => {
    const parser = new Parser({
      fields: ["reserva_id", "salon", "fecha_reserva", "usuario", "importe_total"],
    });
    const csv = parser.parse(reservas);

    res.header("Content-Type", "text/csv");
    res.attachment("reporte_reservas.csv");
    res.send(csv);
  };
}


// <td>$${r.importe_total?.toFixed(2) || "0.00"}</td>