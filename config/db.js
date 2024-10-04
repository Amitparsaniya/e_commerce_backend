import mongoose from "mongoose";
import config from "./config.js";

const db = async ()=>{
    try {
        const connect=await mongoose.connect(config.DB)
        if(connect){
            console.log("DB is connected successfully");
        }
    } catch (error) {
        console.log(error);
    }
}

export default db


// mongodb+srv://amitparasaniya:jykrcWg8wSRo4oDa@node-ecommerce-api.rooh3.mongodb.net/