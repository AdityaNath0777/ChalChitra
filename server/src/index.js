// require('dotenv').config({path: "./.env"}) // now it brings inconsistency in importing

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";


/*  './': Refers to the current working directory 
 *  from which the Node.js process was started
 *
 *  remember? "node src/index.js" script in the pkg.json
 * 
 *  here Node.js process started in the project's working dir 
*/

 dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    let port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });

    // if there's an error after establishing connection with the mongoDB
    // while application is running
    app.on("error", (error) => {
      console.log("MongoDB Error :: within app on :: ", error)
      throw error;
    })
  })
  .catch((error) => {
    console.log("MongoDB Error :: winthin catch ", error)
  });

// First Approach using IIFE (Imm. invoked func expression)
/*
import express from "express";
const app = express()
(async ()=>{
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", (error) => {
      console.log("ERROR:: ", error);
      throw error;
    })

  } catch (error) {
    console.log("Error:: ", error); 
    throw error;
  }
})() 
*/
