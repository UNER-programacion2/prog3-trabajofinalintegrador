import express from "express";
import ReportesController from "../controllers/reportesController.js";
import autorizarUsuarios from "../middleware/auth/autorizarUsuarios.js";

const reporterRouter = express.Router();
const controller = new ReportesController();

reporterRouter.get("/reservas",
    autorizarUsuarios(1), 
    controller.generarReporte);

/**
 * @swagger
 * tags:
 *   - name: Reportes
 *     description: Endpoints para generación de reportes
 */

/**
 * @swagger
 * /reportes/reservas:
 *   get:
 *     summary: Generar reporte de reservas (PDF o CSV)
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: formato
 *         schema:
 *           type: string
 *           enum: [pdf, csv]
 *           default: pdf
 *         description: Formato de salida del reporte
 *     responses:
 *       '200':
 *         description: Archivo generado correctamente (binary)
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       '401':
 *         description: No autenticado / token inválido
 *       '404':
 *         description: No hay reservas registradas
 *       '500':
 *         description: Error interno al generar el reporte
 */

export {reporterRouter};
