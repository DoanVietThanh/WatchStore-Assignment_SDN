import express from "express";
import { createComment, deleteComment, getComments, updateComment } from "../controller/comment.ctrl";
import { validateData } from "../middleware/validation.middleware";
import { commentValidationSchema } from "../validations/comment.validation";
import { authMiddleware } from "../middleware/auth.middleware";

export const commentRoutes = express.Router();

commentRoutes.post("/:watchId", validateData(commentValidationSchema), createComment);
commentRoutes.get("/:watchId", getComments);
commentRoutes.put("/:watchId/:commentId", authMiddleware, validateData(commentValidationSchema), updateComment);
commentRoutes.delete("/:watchId/:commentId", authMiddleware, deleteComment);
