import express from "express";
import { createBrand, deleteBrand, getBrand, queryBrand, updateBrand } from "../controller/brand.ctrl";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware";
import { validateData } from "../middleware/validation.middleware";
import { brandValidationSchema } from "../validations/brand.validation";

export const brandRoutes = express.Router();

brandRoutes.post("/", validateData(brandValidationSchema), authMiddleware, isAdmin, createBrand);
brandRoutes.get("/query-brands", queryBrand);

brandRoutes.get("/:id", getBrand);
brandRoutes.put("/:id", authMiddleware, isAdmin, updateBrand);
brandRoutes.delete("/:id", authMiddleware, isAdmin, deleteBrand);
