import mongoose from "mongoose";
import logger from "./logger";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!)
        logger.info(`Mongo DB Connected : ${conn.connection.host} `)
    } catch(error : any){
        logger.error(`Failed to connect to mongo db`)
        process.exit(1)
    }
}

export default connectDB;