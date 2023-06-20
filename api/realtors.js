import { API_URL } from "@/utils/constant";

export const getRealtors = async (token) => {
  const url = `${API_URL}/users/`;

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
