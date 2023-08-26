import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route.js'

//app es el servidor
const app = express();
//se pone el server en modo escucha
//morgan se encarga de enviar logs por cada petición del usr
app.use(morgan('dev'));


app.use(express.json());
app.use('/api', authRoutes);

export default app;
