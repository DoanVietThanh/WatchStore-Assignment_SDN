import express from "express";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../controller/brand.ctrl";
import { validateData } from "../middleware/validation.middleware";
import { brandValidationSchema } from "../validations/brand.validation";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware";

export const brandRoutes = express.Router();

brandRoutes.post("/", validateData(brandValidationSchema), createBrand);
brandRoutes.get("/all-brands", authMiddleware, isAdmin, getAllBrands);

brandRoutes.get("/:id", getBrand);
brandRoutes.put("/:id", authMiddleware, isAdmin, updateBrand);
brandRoutes.delete("/:id", authMiddleware, isAdmin, deleteBrand);
