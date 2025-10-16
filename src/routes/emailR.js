import express from 'express';
import enviarNotificacionEmail from '../controllers/emailer.js';

const emailRouter = express.Router(); 
const controller = new enviarNotificacionEmail();

emailRouter.post('/', controller.postEmail); 

export { emailRouter };