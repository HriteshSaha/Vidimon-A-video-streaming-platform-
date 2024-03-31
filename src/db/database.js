import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"


/* Two important points about database connectivity: 

1. When connecting to databases, handling potential data-not-found scenarios is essential. Employ try/catch blocks or promises to manage errors or we can also use promises.

key to remember : ( wrap in try-catch )

2. Database operations involve latency, and traditional synchronous code can lead to blocking, where the program waits for the database query to complete before moving on. So, we should async/await which allows for non-blocking execution, enabling the program to continue with other tasks while waiting for the database response. 

key to remember :  ( always remember the database is in another continent, so use async await)*/


const dbConnect = async () => {
    try {
        //connecting database
        const connectionConstraints = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // db_url / database_name

        console.log(`\n DB connected!! DB HOST: ${connectionConstraints.connection.host}`); // we do print the host to check if we connected the right db or not, as db is different for dev, test, production.
    } catch (error) {
        console.error(`DB faild to connect \n ERROR ${error}`);
        process.exit(1)
    }
}

export default dbConnect