import express from "express";
import { createWatch, deleteWatch, getWatch, queryWatches, updateWatch } from "../controller/watch.ctrl";
import { validateData } from "../middleware/validation.middleware";
import { watchValidationSchema } from "../validations/watch.validation";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware";

export const watchRoutes = express.Router();

watchRoutes.post("/", validateData(watchValidationSchema), createWatch);
watchRoutes.get("/query-watches", queryWatches);

watchRoutes.get("/:id", getWatch);
watchRoutes.put("/:id", authMiddleware, isAdmin, updateWatch);
watchRoutes.delete("/:id", authMiddleware, isAdmin, deleteWatch);
