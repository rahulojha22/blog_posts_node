import mongoose from "mongoose";
import { config } from "./config.mjs";

export const connectDb = ()=>{
    mongoose.connect(config.database_connection)
    .then(()=> console.log("connected"))
    .catch((err)=> console.log(err))
}