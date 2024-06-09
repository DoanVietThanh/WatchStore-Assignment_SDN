import { z } from "zod";

export const memberValidationSchema = z.object({
  memberName: z.string().nonempty({ message: "Member name is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
  name: z.string().nonempty({ message: "Name is required" }),
  yob: z.number().int().nonnegative({ message: "Year of birth must be a non-negative integer" }),
  isAdmin: z.boolean().optional(), // isAdmin is optional, defaults to false
});
