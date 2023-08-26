import mongoose from "mongoose"

//config with your own mongo server in case that run in other server

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/merndb')
        console.log("db is connected");
    }
    catch (error) {
        console.log(error);
    }
};

export default connectDB