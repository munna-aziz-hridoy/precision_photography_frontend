import { API_URL } from "@/utils/constant";

// get areas

export const getCommunities = async (token, page = 1) => {
  const url = `${API_URL}/communities/?page=${page}`;

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

// add area

export const addCommunity = async (token, data) => {
  const url = `${API_URL}/communities/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (res.status === 500) return { res, data: null };

  const dataRes = await res.json();

  return { res, data: dataRes };
};

// edit area

export const editCommunity = async (token, slug, data) => {
  const url = `${API_URL}/communities/${slug}/`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      // "content-type": "multipart/form-data",
    },
    body: data,
  });

  if (res.status === 500) return { res, data: null };

  const dataRes = await res.json();

  return { res, data: dataRes };
};

// get single community

export const getCommunity = async (token, slug) => {
  const url = `${API_URL}/communities/${slug}/`;

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 500) return { res, data: null };

  const data = await res.json();

  return { res, data };
};
