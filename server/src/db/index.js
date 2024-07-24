import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// DB is in another continent

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    // console.log(`MonogoDB Connection Instance: `, connectionInstance);
  } catch (error) {
    console.log("MongoDB Connection FAILED:: ", error);

    // process.exit(1):
    // Terminates the process: It stops the Node.js process immediately.
    // Exit code 1: This code indicates that the process exited due to an error. 
    // a non-zero exit code (usually 1) signifies that the process encountered an error or abnormal condition.

    process.exit(1)
  }
}

export default connectDB;