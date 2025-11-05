import ReservasServicios from "../servicios/reservas.js"
import puppeteer from "puppeteer";
import { Parser } from "json2csv";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, "../utils/informe.hbs");
const templateString = fs.readFileSync(templatePath, "utf-8");

export default class ReportesController {
  
  constructor() {
    this.ReservasServicios = new ReservasServicios();
    this.template = Handlebars.compile(templateString);
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

      //obtener datos
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

    const reservasaParaTemplate = reservas.map(r => ({
      reserva_id: r.reserva_id,
      nombre_salon: r.nombre_salon,
      fecha_reserva: new Date(r.fecha_reserva).toLocaleDateString('es-AR'),
      hora_desde: r.hora_desde,
      hora_hasta: r.hora_hasta,
      usuario: r.usuario,
      importe_total: `${Number(r.importe_total || 0).toFixed(2)}`,

    }))
    const html = this.template ({reservas: reservasaParaTemplate});

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

