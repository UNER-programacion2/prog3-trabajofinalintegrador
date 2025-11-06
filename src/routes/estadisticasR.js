import express from 'express';
import EstadisticasController from '../controllers/estadisticasController.js';
import autorizarUsuarios from '../middleware/auth/autorizarUsuarios.js'; 

const estadisticasRouter = express.Router();
const controller = new EstadisticasController();


estadisticasRouter.get('/ingresos-mes', 
    autorizarUsuarios(1), 
    controller.getReporteIngresos
);

estadisticasRouter.get('/reservas-por-salon', 
    autorizarUsuarios(1), 
    controller.getReservasPorSalon
);


/**
 * @swagger
 * tags:
 *   - name: Estadisticas
 *     description: Endpoints para obtener estadísticas y reportes.
 */
 
/**
 * @swagger
 * /api/estadisticas/reservas-por-salon:
 *   get:
 *     summary: Obtener el conteo de reservas por salón.
 *     tags:
 *       - Estadisticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Conteo de reservas por salón.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   salon:
 *                     type: string
 *                     example: "Salón Principal"
 *                   cantidad:
 *                     type: integer
 *                     example: 10
 *       '403':
 *         description: Acceso Denegado. Se requiere rol de Administrador (ID 1).
 *       '500':
 *         description: Error interno del servidor.
 */
 
/**
 * @swagger
 * /api/estadisticas/ingresos-mes:
 *   get:
 *     summary: Obtener el reporte de ingresos de los últimos 30 días.
 *     tags:
 *       - Estadisticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Reporte generado con éxito (o $0 si no hay ingresos).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Total de ingresos generados en los últimos 30 días:"
 *                 total:
 *                   type: number
 *                   example: 15000.50
 *       '403':
 *         description: Acceso Denegado. Se requiere rol de Administrador (ID 1).
 *       '500':
 *         description: Error interno del servidor al generar el reporte.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al generar reporte"
 *                 error:
 *                   type: string
 *                   example: "Mensaje de error específico"
 */

export { estadisticasRouter};