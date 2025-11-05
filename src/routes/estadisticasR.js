import express from 'express';
import EstadisticasController from "../controllers/estadisticasController.js";
import autorizarUsuarios from '../middleware/autorizarUsuarios.js'; 

const estadisticasRouter = express.Router();
const controller = new EstadisticasController();


estadisticasRouter.get('/',
    autorizarUsuarios(1), 
    controller.getReporteIngresos
);


export { estadisticasRouter};