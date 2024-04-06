import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { foundItemRoutes } from "../modules/FoundItem/foundItem.route";
import { claimRoutes } from "../modules/Caim/claim.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/api",
    route: userRoutes,
  },
  {
    path: "/api",
    route: foundItemRoutes,
  },
  {
    path: "/api",
    route: claimRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
