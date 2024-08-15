import express from "express";
import userRoutes from "./userRoutes.js";
import interventionRoutes from "./interventionRoutes.js";

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
router.use("/intervention", interventionRoutes);

export default router;
