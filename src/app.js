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
import { swaggerDocs  } from './config/swagger.js';
import {reporterRouter} from './routes/reportes.js';
import estadisticasRoutes from './routes/estadisticasRoutes.js';




import{ registroClienteRouter } from './routes/registroR.js'

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


app.use('/api/salones', passport.authenticate('jwt', { session: false }), salonesRouter);
app.use('/api/usuarios', usuariosRouter);
// estadisticas 
app.use('/api/estadisticas', estadisticasRoutes);
app.use('/api/servicios', passport.authenticate('jwt', { session: false }), serviciosRouter);
app.use('/api/turnos', passport.authenticate('jwt', { session: false }), turnosRouter);
app.use('/api/notificacion', passport.authenticate('jwt', { session: false }), emailRouter);
app.use('/api/reservas_servicios', passport.authenticate('jwt', { session: false }),reservasServiciosR);
app.use('/api/reservas', passport.authenticate('jwt', { session: false }),reservasRouter);
app.use('/api/auth', authRouter);
app.use('/api/registro', registroClienteRouter);

// pdf csv
app.use('/api/reportes', passport.authenticate('jwt', { session: false }), reporterRouter);

// documentación Swagger
swaggerDocs(app);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));



export default app;
