import prisma from "../../shared/prisma";
import { Claim, UserProfile } from "@prisma/client";

const createClaim = async (
  userId: string,
  foundItemId: string,
  distinguishingFeatures: string,
  lostDate: Date
): Promise<Claim> => {
  const claim = await prisma.claim.create({
    data: {
      userId,
      foundItemId,
      distinguishingFeatures,
      lostDate,
    },
  });

  return claim;
};

const getClaims = async (): Promise<Claim[]> => {
  const claims = await prisma.claim.findMany({
    include: {
      foundItem: {
        include: {
          user: true,
          category: true,
        },
      },
    },
  });

  return claims;
};

const updateClaimStatus = async (
  claimId: string,
  status: string
): Promise<Claim> => {
  const updatedClaim = await prisma.claim.update({
    where: {
      id: claimId,
    },
    data: {
      status,
    },
  });

  return updatedClaim;
};

const getProfile = async (userId: string): Promise<UserProfile | null> => {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  });

  return profile;
};

const updateProfile = async (
  userId: string,
  bio: string,
  age: number
): Promise<UserProfile | null> => {
  const updatedProfile = await prisma.userProfile.update({
    where: {
      userId,
    },
    data: {
      bio,
      age,
    },
    include: {
      user: true,
    },
  });

  return updatedProfile;
};

export const ClaimServices = {
  createClaim,
  getClaims,
  updateClaimStatus,
  getProfile,
  updateProfile,
};
