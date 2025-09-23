
import express from 'express';
import ServiciosController from '../controllers/servicios.js';

const serviciosrouter = express.Router();

serviciosrouter.get('/', ServiciosController.getServicios);
serviciosrouter.get('/:servicio_id', ServiciosController.getServicioConId);
serviciosrouter.post('/', ServiciosController.addServicio);
serviciosrouter.put('/:servicio_id', ServiciosController.editServicio);
serviciosrouter.delete('/:servicio_id', ServiciosController.deleteServicio);

export default serviciosrouter;
