import { CommentType } from "@/types/comment.types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const createComment = async (token: string, comment: CommentType, watchId: string) => {
  const response = await fetch(`${SERVER_URL}/comment/${watchId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while creating comment");
  }
  const data = await response.json();
  return data;
};

export const fetchComments = async (watchId: string) => {
  const response = await fetch(`${SERVER_URL}/comment/${watchId}`, {
    method: "GET",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while fetching comments");
  }
  const data = await response.json();
  console.log("🚀 ~ fetchComments ~ data:", data);
  return data;
};
