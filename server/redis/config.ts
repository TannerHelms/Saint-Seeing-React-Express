import { Queue } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

// Fib Producer
const compressQueue = new Queue(
    "compress",
    {
        connection: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT!!),
        }
    }
)

export default compressQueue;