import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import fs from 'fs';
import { usuariosRouter } from './routes/usuariosR.js';
import { salonesRouter } from './routes/salonesR.js';
import {serviciosRouter} from './routes/serviciosR.js';
import {turnosRouter} from './routes/turnosR.js';
import {emailRouter} from  './routes/emailR.js';
import {reservasServiciosR} from './routes/reservasServiciosR.js';
import { reservasRouter } from './routes/reservasR.js';
import {authRouter } from './routes/authR.js';
import {estrategia, validacion} from './config/passport.js';

const app = express();

// Middlewares globales
app.use(express.json());
app.use(morgan('dev'));  

// configuracion de passport
passport.use('local',estrategia);
passport.use('jwt',validacion);
app.use(passport.initialize()); 

//morgan
let log = fs.createWriteStream('.access.log', { flags: 'a' })
app.use(morgan('combined'))
app.use(morgan('combined', { stream: log }))


app.use('/api/salones', salonesRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/servicios', serviciosRouter);
app.use('/api/turnos', turnosRouter);
app.use('/api/notificacion', emailRouter);
app.use('/api/reservas_servicios', reservasServiciosR);
app.use('/api/reservas',reservasRouter);
app.use('/api/auth', authRouter);



export default app;
