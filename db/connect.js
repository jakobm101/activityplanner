import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("[DB] Checking MongoDB URI...");
if (!MONGODB_URI) {
  console.error("[DB] ERROR: MONGODB_URI is not defined");
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
console.log("[DB] MongoDB URI found");

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  console.log("[DB] Initializing cache...");
  cached = global.mongoose = { conn: null, promise: null };
} else {
  console.log("[DB] Using existing cache");
}

async function dbConnect() {
  console.log("[DB] dbConnect() called");

  if (cached.conn) {
    console.log("[DB] Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("[DB] Creating new connection...");
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("[DB] Connection established successfully");
      return mongoose;
    });
  } else {
    console.log("[DB] Connection promise already exists, waiting...");
  }

  try {
    cached.conn = await cached.promise;
    console.log("[DB] Connection ready");
  } catch (e) {
    console.error("[DB] Connection failed:", e.message);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
