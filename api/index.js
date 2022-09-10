import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

import authRoute from "./Routes/auth.js";
import taskRoute from "./Routes/task.js";
import employeeRoute from "./Routes/employee.js";

const app =express();
dotenv.config();


const connect = async () => {    // connecting to mongoDB database.
    try {
      await mongoose.connect(process.env.URI);
      console.log("connectexd to mongodb")
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

mongoose.connection.on('disconnected',()=>{console.log("mongoDB disconnected")})
mongoose.connection.on('connected',()=>{console.log("mongoDB connected")})

// Middlewares
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoute);
app.use("/api/employee",employeeRoute);
app.use("/api/task",taskRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Hello Error from Handler!!!";
    return res.status(errorStatus).json({
      success:false,
      status:errorStatus,
      message:errorMessage,
      stack:err.stack,
    });
  })
  
  app.listen(8800, () => {
      connect();
    console.log("connected to Backend");
  });
  