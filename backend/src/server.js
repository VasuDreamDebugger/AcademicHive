import express from "express";
import cookieParser from "cookie-parser"
import "dotenv/config";
import ConnectDB from "./Database/MongoDB.js";

import AuthRoutes from "./Routes/AuthRoutes.js";
import createAccountRoutes from "./Routes/createAccount.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", AuthRoutes);
app.use("/api/create-account",createAccountRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

ConnectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log( `Server is running on port ${PORT}`);
});