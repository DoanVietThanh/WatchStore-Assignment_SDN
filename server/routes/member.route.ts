import express from "express";
import {
  deleteMember,
  getAccounts,
  getAllMembers,
  getMember,
  loginMember,
  logoutMember,
  registerMember,
  updateMember,
} from "../controller/member.ctrl";
import { validateData } from "../middleware/validation.middleware";
import { memberValidationSchema } from "../validations/member.validation";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware";

export const memberRoutes = express.Router();

memberRoutes.post("/register", validateData(memberValidationSchema), registerMember);
memberRoutes.post("/login", loginMember);
memberRoutes.post("/logout", authMiddleware, logoutMember);

memberRoutes.get("/all-members", authMiddleware, isAdmin, getAllMembers);
memberRoutes.get("/accounts", authMiddleware, isAdmin, getAccounts);
memberRoutes.put("/:id", authMiddleware, updateMember);
memberRoutes.delete("/:id", authMiddleware, deleteMember);
memberRoutes.get("/:id", authMiddleware, getMember);
