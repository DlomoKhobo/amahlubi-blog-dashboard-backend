import mongoose from "mongoose";
import 'dotenv/config';

// const MONGO_URL = 'mongodb://localhost:27017/amahlubi';

export const connectDB = async () => {
  try {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGO);
    mongoose.connection.on("error", (error: Error) => console.log(error));

    // console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};
