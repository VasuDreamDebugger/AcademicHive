import express from "express";
import {  login } from "../Controllers/AuthController.js";

const router = express.Router();

//router.post("/signup", signUp);
router.post("/login", login);


export default router;