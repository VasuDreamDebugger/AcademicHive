import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors";
import "dotenv/config";
import ConnectDB from "./Database/MongoDB.js";

import AuthRoutes from "./Routes/AuthRoutes.js";
import createAccountRoutes from "./Routes/createAccount.js"

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
  ];
  
  
  

const app = express();

app.use(express.json());
app.use(cookieParser());

//app.use(cors());

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));


app.use("/api/auth", AuthRoutes);
app.use("/api/create-account",createAccountRoutes);

app.get("/api/welcome", (req, res) => {
    res.send("Hello World");
});

ConnectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log( `Server is running on port ${PORT}`);
});

