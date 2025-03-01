import mongoose from "mongoose";

//connection to database
async function connectDB(url) {
   return mongoose.connect(url);
}

export default connectDB;