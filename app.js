
// import express from 'express';
// import handlebars from 'handlebars';
// import nodemailer from 'nodemailer';
// import { fileURLToPath} from 'url';
// import { readFile } from 'fs/promises';
// import path from 'path';
// import {usuariosRouter} from './routes/usuarios.js';
// import { salonesRouter } from './routes/salonesR.js';


// const app = express();

// app.use(express.json());

// app.use('/api/salones', salonesRouter);
// app.use('/api/usuarios', usuariosRouter);




// app.listen(process.env.PUERTO, () => {
//     console.log(`Servidor iniciado en ${process.env.PUERTO}`);
// })

import express from 'express';
import { usuariosRouter } from './routes/usuarios.js';
import { salonesRouter } from './routes/salonesR.js';

const app = express();
app.use(express.json());
app.use('/api/salones', salonesRouter);
app.use('/api/usuarios', usuariosRouter);

const PORT = process.env.PUERTO;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));

export default app;
