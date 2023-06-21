import { API_URL } from "@/utils/constant";

export const getAreas = async (token, page = 1) => {
  const url = `${API_URL}/areas/?page=${page}`;

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 500) {
    return { res, data: null };
  }
  const data = await res.json();

  return { res, data };
};
