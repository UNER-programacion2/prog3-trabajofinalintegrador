import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { fileURLToPath} from 'url';
import { readFile } from 'fs/promises';
import path from 'path';


//POST
export default class enviarNotificacionEmail{

    postEmail =  async(req, res) => {
    const {fecha, salon, turno, correoDestino} = req.body;

    if(!fecha ||  !salon || !turno || !correoDestino){
        res.status(400).send({estado:false, mensaje:'Faltan datos requeridos!'});
    }
    try{

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

        console.log(html) 

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
            //console.log(info);
            res.json({'ok' : true, 'mensaje': 'Correo enviado'});
        });

        }catch(error){
        console.log(error)
    }

}}


