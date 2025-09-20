//BREAD SALONES

import express from 'express';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath} from 'url';
import { readFile } from 'fs/promises';
import path from 'path';
import { conexion } from './db/conexiondb.js';

const app = express();
app.use(express.json());

app.get('/estado', (req, res) => {
    res.json({'ok':true});    
})

//POST
app.post('/notificacion', async (req, res) => {
    console.log(req.body);
    if(!req.body.fecha ||  !req.body.salon || !req.body.turno || !req.body.correoDestino){
        res.status(400).send({'estado':false, 'mensaje':'Faltan datos requeridos!'});
    }
    try{

        const { fecha, salon, turno, correoDestino} = req.body;

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const plantilla = path.join(__dirname,'utiles','handlebars','plantilla.hbs');
        console.log(plantilla);
        
        const datos = await readFile(plantilla,'utf-8')

        var template = handlebars.compile(datos);

        var html = template({
            fecha: fecha, 
            salon: salon, 
            turno: turno
        });

        //console.log(html) 
        const opciones= {
            to: correoDestino,
            subject: 'Notificacion',
            html: html,
        }

        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
        });

       
        transporter.sendMail(opciones, (error,info) => {
            if(error){
                res.json({'ok' : false, 'mensaje': 'Error al enviar correo'});
            }
            console.log(info);
            res.json({'ok' : false, 'mensaje': 'Correo enviado'});
        });

        }catch(error){
        console.log(error)
    }

    //res.json({'ok':true});
})

//GET SALONES
app.get('/salones', async(req, res) => {
    try {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [results, fields] = await conexion.query(sql);
        // console.log(results); 
        // console.log(fields); 
        res.json({'ok':true, 'salones':results});

    } catch (err) {
        console.log(err);
    }
})
 //GET BY ID
app.get('/salones/:salon_id', async (req, res) => {
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
});





//CARGAR variables de entorno
process.loadEnvFile();
app.listen(process.env.PUERTO, () => {
    console.log(`Servidor iniciado en ${process.env.PUERTO}`);
})