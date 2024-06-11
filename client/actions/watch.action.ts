import { serialize } from "@/lib/serialize-query-string";
import { SearchParams } from "@/types/search-params.types";

const SERVER_URL = process.env.SERVER_URL;

export const fetchAllWatch = async (searchParams: SearchParams) => {
  try {
    const convertedQueryString = serialize(searchParams);
    const response = await fetch(`${SERVER_URL}/watch/query-watches?${convertedQueryString}`, {
      method: "GET",
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
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
