"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { serialize } from "@/lib/serialize-query-string";
import { SearchParams } from "@/types/search-params.types";
import { CreateWatchItemType } from "@/types/watch.types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL!;

export const fetchAllWatch = async (searchParams?: SearchParams) => {
  const convertedQueryString = serialize(searchParams);
  const response = await fetch(`${SERVER_URL}/watch/query-watches?${convertedQueryString}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while fetching watches");
  }
  revalidatePath(`/admin/manage-watch`);
  const data = await response.json();
  return data;
};

export const fetchWatch = async (id: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/watch/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    revalidatePath(`/admin/manage-watch`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateWatch = async (watchId: string, dataWatch: any) => {
  try {
    const response = await fetch(`${SERVER_URL}/watch/${watchId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value as string}`,
      },
      body: JSON.stringify(dataWatch),
    });
    revalidatePath(`/admin/manage-watch`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createWatch = async (watch: CreateWatchItemType) => {
  try {
    const response = await fetch(`${SERVER_URL}/watch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value as string}`,
      },
      body: JSON.stringify(watch),
    });
    const data = await response.json();
    revalidatePath(`/admin/manage-watch`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteWatch = async (id: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/watch/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value as string}`,
      },
    });
    const data = await response.json();
    revalidatePath(`/admin/manage-watch`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
