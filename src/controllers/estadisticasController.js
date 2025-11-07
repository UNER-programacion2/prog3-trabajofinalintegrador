import EstadisticasServicio from "../servicios/estadisticasServicio.js";

import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class EstadisticasController {
    
    constructor (){
        this.servicio = new EstadisticasServicio();
    }

    getReservasPorSalon = async (req, res) => {
        try {
            // Llama al servicio sin argumentos
            const resultado = await this.servicio.getReservasPorSalon();
            res.json(resultado);
        } catch (error) {
            console.error("Error al obtener estadísticas:", error); 
            res.status(500).send("Error interno del servidor.");
        }
    }
     getReporteIngresos = async (req, res) => {
        try {
            const reporte = await this.servicio.getIngresos(); 
            
            if (!reporte || reporte.total_ingresos_30_dias === null) {
                 return res.status(200).json({ 
                     mensaje: "No se registraron ingresos en los últimos 30 días.",
                     total: 0 
                 });
            }
            
            res.status(200).json({
                mensaje: "Total de ingresos generados en los últimos 30 días:",
                total: reporte.total_ingresos_30_dias 
            });

        } catch (error) {
            res.status(500).json
            ({ mensaje: 'Error al generar reporte', error: error.message });
        }
  }
  /////crear pdf
    generarReportePDF = async (req, res) => {
        try {
            const reservasData = await this.servicio.getReservasPorSalon();
            const ingresosReporte = await this.servicio.getIngresos();

            const totalIngresos = (ingresosReporte && ingresosReporte.total_ingresos_30_dias !== null) 
                ? ingresosReporte.total_ingresos_30_dias 
                : 0;

            const data = {
                reservas: reservasData,
                ingresos: {
                    total: totalIngresos.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
                }
            };

            const templatePath = path.join(__dirname, '../utils/estadisticas.hbs'); 
            const templateHtml = fs.readFileSync(templatePath, 'utf8');
            const template = handlebars.compile(templateHtml);
            const html = template(data);

            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'] 
            });
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true, 
                margin: {
                    top: '40px',
                    right: '40px',
                    bottom: '40px',
                    left: '40px'
                }
            });
            await browser.close();

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=reporte-estadisticas.pdf'); 
            res.send(pdfBuffer);

        } catch (error) {
            console.error("Error al generar el reporte PDF:", error);
            res.status(500).json({ mensaje: 'Error al generar reporte PDF', error: error.message });
        }
    }
}

