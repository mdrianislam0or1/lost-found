import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middleware/validateRequest";
import { registerUserSchema } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerUserSchema),
  UserControllers.registerUser
);

router.post("/login", UserControllers.loginUser);

export const userRoutes = router;
