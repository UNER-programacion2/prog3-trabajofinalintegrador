import express from 'express';
import  login  from '../controllers/authControlador.js';
import { validacionLogin } from '../middleware/authValidator.js';

const authRouter = express.Router();
const authControlador = new login();

authRouter.post('/', 
    validacionLogin,
    authControlador.login);

export {authRouter};
