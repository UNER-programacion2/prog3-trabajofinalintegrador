const express = require('express');
const app = express();
const userRoutes = require('./routes/usuarios');

app.use(express.json());

app.use('/api/users', userRoutes);

process.loadEnvFile();
app.listen(process.env.PUERTO, () => {
    console.log(`Servidor iniciado en ${process.env.PUERTO}`);
})