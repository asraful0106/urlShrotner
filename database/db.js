import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected!");
    }catch(err){
        console.log("Databse connection failed!", err);
        // console.log("DB: ", process.env.MONGO_URI);
    }
}

export default connectDB;