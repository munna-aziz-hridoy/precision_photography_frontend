import { API_URL } from "@/utils/constant";

// get areas

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

// add area

export const addArea = async (token, data) => {
  const url = `${API_URL}/areas/`;

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

export const editArea = async (token, slug, data) => {
  const url = `${API_URL}/areas/${slug}/`;

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

// get single area

export const getArea = async (token, slug) => {
  const url = `${API_URL}/areas/${slug}/`;

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 500) return { res, data: null };

  const data = await res.json();

  return { res, data };
};
