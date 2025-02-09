import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URI, {
            dbName: 'gbu_academics',
        });
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Database Connection Failed`, error);
        process.exit(1);
    }
}