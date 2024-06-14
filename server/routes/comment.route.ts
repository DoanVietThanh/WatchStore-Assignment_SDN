import express from "express";
import { createComment, deleteComment, getComments, updateComment } from "../controller/comment.ctrl";
import { validateData } from "../middleware/validation.middleware";
import { commentValidationSchema } from "../validations/comment.validation";
import { authMiddleware } from "../middleware/auth.middleware";

export const commentRoutes = express.Router();

commentRoutes.get("/:watchId", getComments);
commentRoutes.post("/:watchId", authMiddleware, validateData(commentValidationSchema), createComment);

commentRoutes.put("/:watchId/:commentId", authMiddleware, validateData(commentValidationSchema), updateComment);
commentRoutes.delete("/:watchId/:commentId", authMiddleware, deleteComment);
