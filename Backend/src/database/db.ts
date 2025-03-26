import mongoose from 'mongoose'
import { MONGO_URI } from '../config/config'

const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI no está definido')
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as any) // Se usa `as any` para evitar errores en TypeScript

    console.log('✅ MongoDB conectado con éxito')
  } catch (error: any) {
    console.error('❌ Error al conectar MongoDB:', error.message)
    process.exit(1)
  }
}

export default connectDB
