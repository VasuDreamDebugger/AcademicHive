import mongoose from 'mongoose'
import "dotenv/config"

const ConnectDB = async () => {
    const mongoUri = process.env.MONGO_URI2;
    if (!mongoUri || typeof mongoUri !== "string" || mongoUri.trim().length === 0) {
        console.error("MONGO_URI is not set. Please add it to your .env file.");
        return process.exit(1);
    }
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Database connection error:", error?.message || error);
        return process.exit(1);
    }
}
export default ConnectDB;