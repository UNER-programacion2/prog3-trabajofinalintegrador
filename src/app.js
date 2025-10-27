import express from 'express';
import { usuariosRouter } from './routes/usuariosR.js';
import { salonesRouter } from './routes/salonesR.js';
import serviciosRouter from './routes/serviciosR.js';
import {turnosRouter} from './routes/turnosR.js';
import {emailRouter} from  './routes/emailR.js';
import {reservasServiciosR} from './routes/reservasServiciosR.js';
import { reservasRouter } from './routes/reservasR.js';

const app = express();
app.use(express.json());
app.use('/api/salones', salonesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/servicios', serviciosRouter);
app.use('/api/turnos', turnosRouter);
app.use('/api/notificacion', emailRouter);
app.use('/api/reservas_servicios', reservasServiciosR);
app.use('/api/reservas',reservasRouter);
// const PORT = process.env.PUERTO;
// app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));

export default app;
