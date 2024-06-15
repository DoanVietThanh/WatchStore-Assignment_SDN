const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchBrands = async () => {
  const response = await fetch(`${SERVER_URL}/brand/query-brands`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred while fetching brands");
  }
  const data = await response.json();
  return data;
};
