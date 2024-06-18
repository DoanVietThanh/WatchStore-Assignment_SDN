import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { MemberType } from "@/types/member.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function getToken() {
//   return localStorage.getItem("token") as string;
// }

// export function getUserInfo(): MemberType {
//   return JSON.parse(localStorage.getItem("userInfo") as string);
// }
