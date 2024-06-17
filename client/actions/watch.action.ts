import { serialize } from "@/lib/serialize-query-string";
import { getToken } from "@/lib/utils";
import { SearchParams } from "@/types/search-params.types";
import { WatchItemType } from "@/types/watch.types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchAllWatch = async (searchParams?: SearchParams) => {
  try {
    const convertedQueryString = serialize(searchParams);
    const response = await fetch(`${SERVER_URL}/watch/query-watches?${convertedQueryString}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export const fetchWatch = async (id: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/watch/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();
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
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dataWatch),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
