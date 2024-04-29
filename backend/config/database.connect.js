import mongoose from "mongoose";

export const connectDatabase = async ()=>{

    let mongoURI = "";

    if(process.env.NODE_ENV === "DEVELOPMENT")
        mongoURI = process.env.DB_LOCAL_URI;

    if(process.env.NODE_ENV === "PRODUCTION")
        mongoURI = process.env.DB_REMOTE_URI;

    const connectionInstance = await mongoose.connect(mongoURI)
    return connectionInstance;
}