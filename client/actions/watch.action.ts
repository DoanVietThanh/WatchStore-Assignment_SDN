import { toast } from "sonner";

export const fetchAllWatch = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/watch/query-watches", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
