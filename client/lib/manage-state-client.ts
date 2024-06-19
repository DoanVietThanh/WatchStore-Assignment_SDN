"use client";
import { MemberType } from "@/types/member.types";

export function getUserInfo(): MemberType {
  return JSON.parse(localStorage.getItem("userInfo") as string);
}
