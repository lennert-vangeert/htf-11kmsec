import { Express, Router } from "express";
import userPublicRoutes from "../modules/Users/User.public.routes";
import userPrivateRoutes from "../modules/Users/User.private.routes";
import { errorHandler } from "../middleware/Error/errorHandlerMiddleware";
import { authJwt } from "../middleware/Auth/authMiddleware";
import productPublicRoutes from "../modules/Challenges/Challenge.public.routes";
import productPrivateRoutes from "../modules/Challenges/Challenge.private.routes";

const registerRoutes = (app: Express) => {
  // Public routes
  app.use("/", userPublicRoutes);
  app.use("/", productPublicRoutes);

  // Authenticated routes
  const authRoutes = Router();
  authRoutes.use("/", userPrivateRoutes);
  authRoutes.use("/", productPrivateRoutes);

  app.use(authJwt, authRoutes);

  // Error handler middleware
  app.use(errorHandler);
};

export { registerRoutes };
