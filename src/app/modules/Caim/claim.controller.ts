import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../shared/sendResponse";
import { ClaimServices } from "./claim.service";

const createClaim = async (req: Request, res: Response) => {
  try {
    const { foundItemId, distinguishingFeatures, lostDate } = req.body;
    const userId = (req as any).user.id;

    const claim = await ClaimServices.createClaim(
      userId,
      foundItemId,
      distinguishingFeatures,
      lostDate
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Claim created successfully",
      data: claim,
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

const getClaims = async (req: Request, res: Response) => {
  try {
    const claims = await ClaimServices.getClaims();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Claims retrieved successfully",
      data: claims,
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

const updateClaimStatus = async (req: Request, res: Response) => {
  try {
    const { claimId } = req.params;
    const { status } = req.body;

    const updatedClaim = await ClaimServices.updateClaimStatus(claimId, status);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Claim updated successfully",
      data: updatedClaim,
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

const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const profile = await ClaimServices.getProfile(userId);

    if (!profile) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Profile not found",
        data: null,
      });
    }

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile retrieved successfully",
      data: {
        id: profile.id,
        userId: profile.userId,
        bio: profile.bio,
        age: profile.age,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        user: {
          id: profile.userId,
          name: (profile as any).user.name,
          email: (profile as any).user.email,
          createdAt: (profile as any).user.createdAt,
          updatedAt: (profile as any).user.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error("Error retrieving profile:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
      data: null,
    });
  }
};

const updateMyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bio, age } = req.body;
    const userId = (req as any).user.id;

    const updatedProfile = await ClaimServices.updateProfile(userId, bio, age);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully",
      data: {
        id: updatedProfile?.id,
        userId: updatedProfile?.userId,
        bio: updatedProfile?.bio,
        age: updatedProfile?.age,
        createdAt: updatedProfile?.createdAt,
        updatedAt: updatedProfile?.updatedAt,
        user: {
          id: updatedProfile?.userId,
          name: (updatedProfile as any)?.user?.name,
          email: (updatedProfile as any)?.user?.email,
          createdAt: (updatedProfile as any)?.user?.createdAt,
          updatedAt: (updatedProfile as any)?.user?.updatedAt,
        },
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

export const ClaimController = {
  createClaim,
  getClaims,
  updateClaimStatus,
  getProfile,
  updateMyProfile,
};
