import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export class MongoDBHelper {
    /***
     * Function to connect with MongoDB
     * @returns The response of the connection try
     */
    async connect() {
        try {
            const connectionResponse = await mongoose.connect(
                `mongodb://localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`
            );
            return connectionResponse;
        } catch (err) {
            console.error(`Error connecting with MongoDB. ${err}`);
            throw err;
        }
    }
}
