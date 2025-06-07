import mongoose from "mongoose";
import { config } from "dotenv";

export const connectDB = async () => {

    const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1/storeDB';
    try {
        await mongoose.connect(DB_URI)
        console.log(`Mongo Connect to ${DB_URI}`);
    } catch (err) {
        console.log('Mongo Error', err.message);
        process.exit();
    }
}