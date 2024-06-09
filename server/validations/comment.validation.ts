import mongoose from "mongoose";
import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const commentValidationSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(3, { message: "Rating cannot be more than 3" }),
  content: z.string().nonempty({ message: "Content is required" }),
  author: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val) && objectIdRegex.test(val), {
    message: "Invalid ObjectId",
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
