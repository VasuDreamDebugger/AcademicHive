import express from "express";
import { createFacultyAccount, createStudentAccount } from "../Controllers/CreateAccountController.js";
import {developerMiddleware} from "../Middlewares/developerMiddleware.js";

const router = express.Router();
 

router.post("/faculty",developerMiddleware, createFacultyAccount);

router.post("/student",developerMiddleware, createStudentAccount);

export default router