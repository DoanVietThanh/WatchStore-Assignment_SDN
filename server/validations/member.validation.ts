import { z } from "zod";

export const memberValidationSchema = z.object({
  memberName: z.string().nonempty({ message: "Member name is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
  name: z.string().nonempty({ message: "Name is required" }),
  yob: z.number().int().nonnegative({ message: "Year of birth must be a non-negative integer" }),
  isAdmin: z.boolean().optional(), // isAdmin is optional, defaults to false
});

export const updatePasswordValidationSchema = z.object({
  oldPassword: z.string().nonempty({ message: "Password is required" }).min(4, {
    message: "Password must be at least 4 characters.",
  }),
  confirmedPassword: z.string().nonempty({ message: "Confirmed password is required" }),
  newPassword: z.string().nonempty({ message: "New password is required" }).min(4, {
    message: "New password must be at least 4 characters.",
  }),
});
