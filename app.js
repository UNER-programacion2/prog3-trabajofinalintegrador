

import express from 'express';
import { usuariosRouter } from './routes/usuarios.js';
import { salonesRouter } from './routes/salonesR.js';
import serviciosRouter from './routes/serviciosR.js';


const app = express();
app.use(express.json());
app.use('/api/salones', salonesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/servicios', serviciosRouter);

const PORT = process.env.PUERTO;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));

export default app;
