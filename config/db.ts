// config/db.ts

import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let isConnected = false; // Track the connection sta

// Function to establish a MongoDB connection
const connectDB = async () => {

  if (isConnected) {
    return; // Use existing connection if already connected
  }

  try {
    // Connect to MongoDB using the URL from environment variables
    const connectionInstance = await mongoose.connect(MONGODB_URL, {
      // Server selection timeout - determines how long to wait for a server response
      serverSelectionTimeoutMS: 5000, // Timeout set to 5 seconds; can be adjusted as needed
    });

    isConnected = !!connectionInstance.connections[0].readyState;

    // Logs the successful connection and displays the MongoDB host
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
      
  } catch (error) {
    // Logs the error message if connection fails and exits the process
    console.log("MONGODB connection error - ", error);
    process.exit(1); // Exit process with failure code
  }
}

export default connectDB;
