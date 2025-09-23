
import express from 'express';
import ServiciosController from '../controllers/serviciosController.js';

const router = express.Router();

router.get('/', ServiciosController.getServicios);
router.get('/:servicio_id', ServiciosController.getServicioConId);
router.post('/', ServiciosController.addServicio);
router.put('/:servicio_id', ServiciosController.editServicio);
router.delete('/:servicio_id', ServiciosController.deleteServicio);

export default router;
