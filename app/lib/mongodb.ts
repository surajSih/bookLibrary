import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in your environment variables");
}

// Define an interface for the global cache
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global object to include our cache
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

// Use the global cache if it exists, otherwise create it
let cached: MongooseCache = global._mongooseCache || {
  conn: null,
  promise: null,
};

export default async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    cached.promise = null;
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }

  global._mongooseCache = cached; // store back to global
  return cached.conn;
}
