import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGODB_URI not set");

    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}


