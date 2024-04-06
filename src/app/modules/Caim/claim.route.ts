import express from "express";
import { ClaimController } from "./claim.controller";
import auth from "../../middleware/auth";
import { createClaimSchema } from "./claim.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/claims",
  auth(),
  validateRequest(createClaimSchema),
  ClaimController.createClaim
);

router.get("/claims", auth(), ClaimController.getClaims);

router.put("/claims/:claimId", auth(), ClaimController.updateClaimStatus);

router.get("/my-profile", auth(), ClaimController.getProfile);
router.put("/my-profile", auth(), ClaimController.updateMyProfile);

export const claimRoutes = router;
