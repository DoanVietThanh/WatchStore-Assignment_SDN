import { z } from "zod";
import { commentValidationSchema } from "./comment.validation";
import mongoose from "mongoose";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const watchValidationSchema = z.object({
  watchName: z.string().nonempty({ message: "Watch name is required" }),
  image: z.string().nonempty({ message: "Image URL is required" }),
  price: z.number().nonnegative({ message: "Price must be a non-negative number" }),
  Automatic: z.boolean().optional(), // This defaults to false
  watchDescription: z.string().nonempty({ message: "Watch description is required" }),
  comments: z.array(commentValidationSchema).optional(), // This defaults to an empty array
  brand: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val) && objectIdRegex.test(val), {
    message: "Invalid ObjectId",
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
