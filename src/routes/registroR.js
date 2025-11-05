import express from 'express';
import registroClienteController from '../controllers/RegistroController.js'
import { validarRegistroCliente } from '../middleware/registroClienteValidator.js';

const registroClienteRouter = express.Router();
const controller = new registroClienteController();

registroClienteRouter.post('/',
    validarRegistroCliente, 
    controller.postCliente);



export { registroClienteRouter};