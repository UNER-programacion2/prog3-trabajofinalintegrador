import express from 'express';
import registroClienteController from  '../../controllers/auth/RegistroController.js'
import { validarRegistroCliente } from '../../middleware/auth/registroClienteValidator.js';

const registroClienteRouter = express.Router();
const controller = new registroClienteController();

registroClienteRouter.post('/',
    validarRegistroCliente, 
    controller.postCliente);



export { registroClienteRouter};