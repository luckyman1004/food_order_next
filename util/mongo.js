import mongoose from 'mongoose'

const NEXT_PUBLIC_MONGO_URL = process.env.NEXT_PUBLIC_MONGO_URL

if (!NEXT_PUBLIC_MONGO_URL) {
   
  throw new Error(
    'Please define the MONGO_URL environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(NEXT_PUBLIC_MONGO_URL, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect