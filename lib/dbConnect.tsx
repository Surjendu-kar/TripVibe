import mongoose from "mongoose";

type ConnectionObj = {
  isConnected?: number;
  isConnecting?: Promise<void>;
};

const connection: ConnectionObj = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }
  if (connection.isConnecting) {
    console.log("DB connection is already being established");
    await connection.isConnecting;
    return;
  }
  
  connection.isConnecting = (async () => {
    try {
      console.log("Attempting to connect with URI:", process.env.MONGODB_URI);
      const db = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/myDatabase");
      connection.isConnected = db.connections[0].readyState;
      console.log("DB Connected Successfully");
    } catch (error) {
      console.error("Database connection failed", error);
      // Consider a retry logic here or some other form of error management
    } finally {
      connection.isConnecting = undefined;
    }
  })();

  await connection.isConnecting;
}

export default dbConnect;
