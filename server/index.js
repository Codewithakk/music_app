import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import Commonrouter from './router/common.js';
import Userrouter from "./router/userrouter.js";
import bodyParser from "body-parser";

dotenv.config({ path: "./config.env" });  // Ensure dotenv is configured at the top
console.log("MongoDB Connection String:", process.env.mongoDB); // Debugging statement

const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/common', Commonrouter);
app.use("/user", Userrouter);

const port = 8000;
const db = process.env.mongoDB;  // Use the environment variable after loading dotenv

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

app.get('/', (req, res) => {
    res.send("hello");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
