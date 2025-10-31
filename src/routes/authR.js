import express from 'express';
import LoginController from '../controllers/authControlador.js'
import { validacionLogin } from '../middleware/authValidator.js';

const authRouter = express.Router();
const authControlador = new LoginController();

authRouter.post('/', 
    validacionLogin,
    authControlador.login);

export {authRouter};
