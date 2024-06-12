import { MemberType } from "@/types/member.types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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
