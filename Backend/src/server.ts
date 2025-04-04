import app from './app';
import { PORT, HOST } from './config/config'; // Importa HOST
import connectDB from '../src/database/db';

const port = Number(PORT) || 4000; // Asegúrate que sea número

connectDB();

app.listen(port, HOST, () => {
  console.log(`Servidor escuchando en http://${HOST}:${port}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'production'}`);
});