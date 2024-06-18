"use client";
import { MemberType } from "@/types/member.types";

export function getToken() {
  return window?.localStorage?.getItem("token") as string;
}

export function getUserInfo(): MemberType {
  return JSON.parse(localStorage.getItem("userInfo") as string);

  // let member;
  // if (typeof window !== "undefined") {
  //   member = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null;
  // }
  // return member;
}
