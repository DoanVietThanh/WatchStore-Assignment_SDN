import express from "express";
import {
  deleteMember,
  getAccounts,
  getAllMembers,
  getCurrentMember,
  getMember,
  loginMember,
  logoutMember,
  registerMember,
  updateMember,
  updatePassword,
  updateProfile,
} from "../controller/member.ctrl";
import { validateData } from "../middleware/validation.middleware";
import { memberValidationSchema, updatePasswordValidationSchema } from "../validations/member.validation";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware";

export const memberRoutes = express.Router();

memberRoutes.post("/register", validateData(memberValidationSchema), registerMember);
memberRoutes.post("/login", loginMember);
memberRoutes.post("/logout", authMiddleware, logoutMember);

memberRoutes.get("/all-members", authMiddleware, isAdmin, getAllMembers);
memberRoutes.get("/accounts", authMiddleware, isAdmin, getAccounts);
memberRoutes.get("/current-member", authMiddleware, getCurrentMember);
memberRoutes.put(
  "/:memberId/update-password",
  authMiddleware,
  validateData(updatePasswordValidationSchema),
  updatePassword
);

memberRoutes.patch("/:memberId/update-profile", authMiddleware, updateProfile);

memberRoutes.put("/:id", authMiddleware, updateMember);
memberRoutes.delete("/:id", authMiddleware, deleteMember);
memberRoutes.get("/:id", authMiddleware, getMember);
