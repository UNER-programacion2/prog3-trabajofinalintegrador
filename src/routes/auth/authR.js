import express from 'express';
import LoginController from '../../controllers/auth/authControlador.js'
import { validacionLogin } from '../../middleware/auth/authValidator.js';

const authRouter = express.Router();
const authControlador = new LoginController();

authRouter.post('/', 
    validacionLogin,
    authControlador.login);

export {authRouter};
