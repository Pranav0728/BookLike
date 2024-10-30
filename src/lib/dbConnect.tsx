import { MongoClient } from "mongodb";

const MONGODB_URL = process.env.MONGODB_URI as string;

if (!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variable inside .env.local");
}

// Global declaration for cache (only for dev/hot-reload purposes)
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Cached MongoDB connection
let cached = global._mongoClientPromise;

if (!cached) {
    const client = new MongoClient(MONGODB_URL);
    cached = client.connect();
    global._mongoClientPromise = cached;
}

const dbConnect = async (): Promise<MongoClient> => {
    if (!cached) {
        throw new Error("MongoClient not initialized.");
    }
    return await cached;
};

export default dbConnect;
