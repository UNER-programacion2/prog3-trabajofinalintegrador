// src/routes/estadisticasRoutes.js

import express from "express";
import EstadisticasController from "../controllers/estadisticasController.js"; 

const router = express.Router();
const controller = new EstadisticasController();

// La ruta final es sin el parámetro :salon_id
// La URL a probar es: GET /api/estadisticas/reservas-por-salon
router.get("/reservas-por-salon", controller.getReservasPorSalon);

export default router;