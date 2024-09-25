import mongoose from "mongoose";

global.isMongoConnected = false;

async function dbConnect() {
  if (global.isMongoConnected) {
    console.log("already connected");
    return;
  }
  try {
    console.log("new connect");
    await mongoose.connect(process.env.DB_URI);
    global.isMongoConnected = true;
  } catch (err) {
    throw err;
  }
}

export default dbConnect;
