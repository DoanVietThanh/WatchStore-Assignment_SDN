const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchComments = async (watchId: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/comment/${watchId}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
