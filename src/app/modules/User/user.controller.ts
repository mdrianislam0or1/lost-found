import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserServices } from "./user.sevice";
import { jwtHelpers, validatePassword } from "../../helpars/jwtHelpers";
import sendResponse from "../../shared/sendResponse";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profile } = req.body;
    const user = await UserServices.registerUser(
      name,
      email,
      password,
      profile
    );
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile,
    };

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: userData,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while registering the user",
      data: null,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserServices.getUserByEmail(email);

    if (!user) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Invalid email or password",
        data: null,
      });
    }

    const isPasswordValid = await validatePassword(password, user.password);

    if (!isPasswordValid) {
      return sendResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Invalid email or password",
        data: null,
      });
    }

    const token = jwtHelpers.generateToken(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "",
      "20d"
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

export const UserControllers = {
  registerUser,
  loginUser,
};
