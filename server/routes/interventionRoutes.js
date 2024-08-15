import express from "express";
import {
  createSubIntervention,
  createIntervention,
  dashboardStatistics,
  deleteRestoreIntervention,
  duplicateIntervention,
  getIntervention,
  getInterventions,
  postInterventionActivity,
  trashIntervention,
  updateIntervention,
} from "../controllers/interventionController.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createIntervention);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateIntervention);
router.post("/activity/:id", protectRoute, postInterventionActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getInterventions);
router.get("/:id", protectRoute, getIntervention);

router.put("/create-subintervention/:id", protectRoute, isAdminRoute, createSubIntervention);
router.put("/update/:id", protectRoute, isAdminRoute, updateIntervention);
router.put("/:id", protectRoute, isAdminRoute, trashIntervention);

router.delete(
  "/delete-restore/:id?",
  protectRoute,
  isAdminRoute,
  deleteRestoreIntervention
);

export default router;
