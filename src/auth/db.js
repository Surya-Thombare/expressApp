import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config()

const uri = process.env.MONGODB_URL
let conn = mongoose.connection;

export const InitiateMongoServer = async () => {
    try {
        mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        conn.on('connected', function() {
            console.log('database is connected successfully');
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        conn.on('error', console.error.bind(console, 'connection error:'));
    }
}

export default conn;
