import express from "express";
import dotenv from 'dotenv';
import { connectDatabase } from "./config/database.connect.js";
import cookieParser from 'cookie-parser'

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

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded(
    {
        extended: true,
        limit: "16kb",
    }
));
app.use(cookieParser());
app.use(express.static("public"));
    
    
//importing routes
import apiResponse from "./utils/apiResponse.js";
import productRouter from "./routes/product.routes.js";
import authRouter from "./routes/auth.routes.js";
import orderRouter from "./routes/order.routes.js";
import reviewsRouter from "./routes/reviews.routes.js";

app.use('/api/v1/product', productRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/reviews', reviewsRouter)

app.use((err, req, res, next)=>{
    res
    .status(err.statusCode || 500)
    .json(
        new apiResponse(err.statusCode || 500, err.message || "Internal Server Error", null)
    );
})

