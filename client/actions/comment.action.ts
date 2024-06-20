"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { CommentType } from "@/types/comment.types";

import { getCurrentMember } from "./member.action";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!;

// export const createComment = async (comment: CommentType, watchId: string) => {
//   const response = await fetch(`${SERVER_URL}/comment/${watchId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${cookies().get("token")?.value as string}`,
//     },
//     body: JSON.stringify(comment),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "An error occurred while creating comment");
//   }
//   return response.json();
// };

export const createComment = async (comment: CommentType, watchId: string) => {
  // const currentMember = await getCurrentMember();
  const response = await fetch(`${SERVER_URL}/comment/${watchId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value as string}`,
    },
    body: JSON.stringify({ ...comment }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while creating comment");
  }

  revalidatePath(`/watch/${watchId}`);
  return response.json();
};

export const fetchComments = async (watchId: string) => {
  const response = await fetch(`${SERVER_URL}/comment/${watchId}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while fetching comments");
  }
  const data = await response.json();
  return data;
};

export const deleteComment = async (watchId: string, commentId: string) => {
  const response = await fetch(`${SERVER_URL}/comment/${watchId}/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value as string}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while deleting comment");
  }

  const data = await response.json();
  return data;
};
