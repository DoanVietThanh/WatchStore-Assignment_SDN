"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { serialize } from "@/lib/serialize-query-string";
import { SearchParams } from "@/types/search-params.types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchBrands = async (searchParams?: SearchParams) => {
  const convertedQueryString = serialize(searchParams);

  const response = await fetch(`${SERVER_URL}/brand/query-brands?${convertedQueryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while fetching brands");
  }
  const data = await response.json();
  revalidatePath("/admin/manage-brand");
  return data;
};

export const updateBrand = async (id: string, brand: any) => {
  const response = await fetch(`${SERVER_URL}/brand/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value as string}`,
    },
    body: JSON.stringify(brand),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while updating brand");
  }
  const data = await response.json();
  revalidatePath("/admin/manage-brand");
  return data;
};

export const createBrand = async (brand: any) => {
  const response = await fetch(`${SERVER_URL}/brand`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value as string}`,
    },
    body: JSON.stringify(brand),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while creating brand");
  }
  const data = await response.json();
  revalidatePath("/admin/manage-brand");
  return data;
};

export const deleteBrand = async (id: string) => {
  const response = await fetch(`${SERVER_URL}/brand/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value as string}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while deleting brand");
  }
  const data = await response.json();
  revalidatePath("/admin/manage-brand");
  return data;
};
