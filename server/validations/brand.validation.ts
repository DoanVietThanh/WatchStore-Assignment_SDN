import { z } from "zod";

export const brandValidationSchema = z.object({
  brandName: z.string().nonempty({ message: "Brand Name is required" }),
});
