import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { validateApiKey } from './helpers/validator';
import cookieParser from 'cookie-parser';
import { URL_FRONT } from './config/config';

const app: Application = express();

// Configuración mejorada de CORS
const allowedOrigins = [
  URL_FRONT|| '',
  'http://localhost:5173', // Añade explícitamente localhost
  'https://tu-frontend-en-render.com' // Cuando despliegues el front
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some(allowed => origin.includes(allowed))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
  })
);

// Manejo explícito de OPTIONS para preflight
app.options('*', cors());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(validateApiKey);
app.use(routes);

export default app;