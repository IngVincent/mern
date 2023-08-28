import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'; //libreria para administrar facilmete los cors
import { FRONTEND_URL } from "./config.js";

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

//app es el servidor
const app = express();
//se pone el server en modo escucha
app.use(
    cors({
        //credentials: true,
        origin: FRONTEND_URL,
    })
); //permite que todos los dominios se puedan comunicar al backend, con esto evitamos el problema de que react p:5173 se comunique con node p:3000 
//morgan se encarga de enviar logs por cada petición del usr
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

export default app;
