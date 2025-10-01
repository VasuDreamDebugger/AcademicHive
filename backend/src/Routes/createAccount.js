import express from "express";
import { createFacultyAccount, createStudentAccount } from "../Controllers/createAccountController.js";

const router = express.Router();
 

router.post("/faculty", createFacultyAccount);

router.post("/student", createStudentAccount);

export default router