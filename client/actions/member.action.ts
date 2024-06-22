"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { MemberType } from "@/types/member.types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!;

export const signInMember = async (values: { memberName: string; password: string }) => {
  const response = await fetch(`${SERVER_URL}/member/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while logging in");
  }

  const responseData = await response.json();
  cookies().set("token", responseData?.token);
  return responseData;
};

export const signUpMember = async (values: MemberType) => {
  const response = await fetch(`${SERVER_URL}/member/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while registering");
  }

  const responseData = await response.json();
  return responseData;
};

export const logoutMember = async () => {
  const response = await fetch(`${SERVER_URL}/member/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value as string}`,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while logging out");
  }
  cookies().delete("token");
  const responseData = await response.json();
  return responseData;
};

export const getCurrentMember = async () => {
  if (cookies().get("token")?.value) {
    const response = await fetch(`${SERVER_URL}/member/current-member`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value || ""}`,
      },
      cache: "no-store",
    });
    const responseData = await response.json();
    return responseData.data;
  }
  return null;
};

export const fetchAccounts = async () => {
  const response = await fetch(`${SERVER_URL}/member/accounts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies().get("token")?.value as string}`,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData.message);
  }
  const data = await response.json();
  return data;
};

export const updatePassword = async (
  memberId: string,
  values: { oldPassword: string; confirmedPassword: string; newPassword: string }
) => {
  const response = await fetch(`${SERVER_URL}/member/${memberId}/update-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value as string}`,
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while updating brand");
  }
  const data = await response.json();
  revalidatePath(`/profile/${memberId}`);
  return data;
};

export const updateProfile = async (memberId: string, values: any) => {
  const response = await fetch(`${SERVER_URL}/member/${memberId}/update-profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value as string}`,
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while logging out");
  }
  const data = await response.json();
  return data;
};
