import app from './app';
import { PORT, HOST } from './config/config';
import connectDB from '../src/database/db';

const port = Number(PORT) || 4000;

// Conexión a DB con manejo mejorado de errores
connectDB().catch(err => {
  console.error('❌ Fallo la conexión a MongoDB:', err);
  process.exit(1);
});

app.listen(port, HOST, () => {
  console.log(`🚀 Servidor escuchando en http://${HOST}:${port}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🔄 Orígenes permitidos: ${process.env.URL_FRONT}`);
});