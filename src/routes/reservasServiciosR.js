import express from 'express';
import reservasServiciosController from '../controllers/reservas_Servicios.js';


const reservasServiciosR = express.Router();
const controller = new reservasServiciosController();

reservasServiciosR.get('/', controller.getReservasServicios);
reservasServiciosR.get('/reserva_servicio/:id', controller.getReservaServicioConId);
reservasServiciosR.post('/',controller.addServicioReserva);
reservasServiciosR.put('/reserva_servicio/:id', controller.updateReservaServicio);
reservasServiciosR.delete('/reserva_servicio/:id', controller.deleteRerservaServicio);

export {reservasServiciosR};
