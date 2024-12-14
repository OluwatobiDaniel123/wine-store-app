import express from "express";

import { authControllers } from "../controller/authController.js";

export const authRouter = express.Router();

authRouter.post("/register", authControllers.register);
authRouter.post("/login", authControllers.login);
