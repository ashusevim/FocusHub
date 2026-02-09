import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

try {
    const URI = process.env.DB_URI;
	const connectionInstance = mongoose.connect(`${URI}`);
	console.log(connectionInstance.then((data) => console.log(data)));
    // console.log(`MongoDB connected to ${connectionInstance.connection.host}`);
} catch (error) {
	console.log()
}
