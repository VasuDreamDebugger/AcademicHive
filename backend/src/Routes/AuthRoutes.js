import express from "express";
import {  login,devSignUp,devLogin } from "../Controllers/AuthController.js";

const router = express.Router();

//router.post("/signup", signUp);
router.post("/login", login);

router.post("/signup/developer",devSignUp);
router.post("/login/developer",devLogin);
export default router;