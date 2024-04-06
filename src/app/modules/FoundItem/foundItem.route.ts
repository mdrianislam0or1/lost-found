import express from "express";
import { FoundItemController } from "./foundItem.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/found-item-categories",
  auth(),
  FoundItemController.createFoundItemCategory
);
router.post("/found-items", auth(), FoundItemController.reportFoundItem);

router.get("/found-items", auth(), FoundItemController.getFoundItems);

export const foundItemRoutes = router;
