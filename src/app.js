
import express from 'express';
import { usuariosRouter } from './routes/usuarios.js';
import { salonesRouter } from './routes/salonesR.js';
import serviciosRouter from './routes/serviciosR.js';
<<<<<<< HEAD:app.js
import turnosRouter from './routes/turnosR.js';
=======
import {emailRouter} from  './routes/emailR.js';

>>>>>>> abced7a0ddb85eabe2fd8fac99363bfc4f8c658f:src/app.js

const app = express();
app.use(express.json());
app.use('/api/salones', salonesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/servicios', serviciosRouter);
<<<<<<< HEAD:app.js
app.use('/api/turnos', turnosRouter);
=======
app.use('/api/notificacion', emailRouter);
>>>>>>> abced7a0ddb85eabe2fd8fac99363bfc4f8c658f:src/app.js

// const PORT = process.env.PUERTO;
// app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));

export default app;
