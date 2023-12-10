import mongoose from "mongoose";
const connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected succesfully");
  } catch (error) {
    console.log("Error occured during connecting the database", error);
  }
};
export default connectdb;
