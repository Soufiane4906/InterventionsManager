import express from "express";
import userRoutes from "./userRoutes.js";
import interventionRoutes from "./interventionRoutes.js";
import customerRoutes from "./customerRoutes.js";

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
router.use("/intervention", interventionRoutes);
router.use("/customer", customerRoutes);




export default router;
