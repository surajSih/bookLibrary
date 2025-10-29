import mongoose from "mongoose";

export interface MongoDBConnection {
  isConnected: boolean;
}

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let isConnected = false;

export default async function connectDB(): Promise<void> {
  if (isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ New database connection established");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
}
