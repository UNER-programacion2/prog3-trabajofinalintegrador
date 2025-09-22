//BREAD SALONES

import express from 'express';
import { conexion } from '../db/conexion.js';

const app = express();
app.use(express.json());

app.get('/estado', (req, res) => {
    res.json({'ok':true});    
})

//GET SALONES
const getSalones =  async(req, res) => {
    try {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [results] = await conexion.query(sql);
        res.json({'ok':true, 'salones':results});

    } catch (err) {
        console.log(err);
    }
}

 //GET BY ID
const getSalonConId = async (req, res) => {
    try {
        const salon_id = req.params.salon_id
        const sql = `SELECT * FROM salones WHERE salon_id = ${salon_id} AND activo = 1`;
        const [results, fields] = await conexion.query(sql);
        console.log(results); console.log(fields);
        res.json({ ok: true, salones: results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, mensaje: 'Error al obtener salones' });
    }
}

export{getSalones, getSalonConId};



//CARGAR variables de entorno
//process.loadEnvFile();
// app.listen(process.env.PUERTO, () => {
//     console.log(`Servidor iniciado en ${process.env.PUERTO}`);
// })