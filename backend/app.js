import express from "express";
import dotenv from 'dotenv';
import { connectDatabase } from "./config/database.connect.js";

dotenv.config(
    {
        path: 'backend/config/config.env',
    }
);

const app = express();

connectDatabase()
    .then((con)=>{
        app.listen(process.env.PORT, ()=>{
            console.log(`server is up and live on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
            console.log(`database of ${con.connection.name} is connected to mongodb community center on port ${con.connection.port}`)
        })        
    })
    .catch((error)=>{
        console.log(error);
    })



//importing routes

