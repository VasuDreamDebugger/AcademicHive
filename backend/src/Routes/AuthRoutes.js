import express from "express";
import {  login,devSignUp,devLogin,getUser } from "../Controllers/AuthController.js";
import {developerMiddleware} from "../Middlewares/developerMiddleware.js";


const router = express.Router();

 
router.get("/user/me",developerMiddleware,getUser);
router.post("/login", login);

router.post("/signup/developer",devSignUp);
router.post("/login/developer",devLogin);
export default router;