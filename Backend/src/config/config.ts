import * as dotenv from 'dotenv'
dotenv.config()

export const {
  PORT = 3001,
  MONGO_URI = '',
  JWT_SECRET = 'SecretToken',
  API_KEY = '',
  NODE_ENV = 'production', 
  URL_FRONT,
} = process.env;


export const HOST = NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';