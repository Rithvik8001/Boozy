import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};

export default connectDb;
