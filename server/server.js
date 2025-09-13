import express from "express";
import cros from "cros";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Feedback from "./routes/feedback";
dotenv.config();
const app =express();
app.use(cros());
app.use(express.json());
app.use("api/feedback",Feedback);
app.use(axios());

mongoose.connect(process.env.MONGO_URL)
.then (() =>{
    app.listen(process.env.PORT =() =>{
        console.log("Listening to PORT ${process.env.PORT}");
    });
})
  .catch(err => console.error("MongoDB connection error:", err));
