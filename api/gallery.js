import { API_URL } from "@/utils/constant";

// get gallery

export const getGalleries = async (token) => {
  const url = `${API_URL}/gallery/`;

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

// gallery details

export const getGalleryDetails = async (token, id) => {
  const url = `${API_URL}/gallery/${id}`;

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

// create gallery

export const addGallery = async (token, name) => {
  const url = `${API_URL}/gallery/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(name),
  });

  if (res.status === 500) {
    return { res, data: null };
  }
  const data = await res.json();

  return { res, data };
};

// add image to gallery

export const addImageToGallery = async (token, data) => {
  const url = `${API_URL}/gallery/upload/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (res.status === 500) {
    return { res, data: null };
  }
  const dataRes = await res.json();

  return { res, data: dataRes };
};

// apply sorting to gallery

export const applyManualSort = async (token, data) => {
  const url = `${API_URL}/gallery/sort/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 500) {
    return { res, data: null };
  }
  const dataRes = await res.json();

  return { res, data: dataRes };
};

// apply sort by name

export const applySortByName = async (token, data) => {
  const url = `${API_URL}/gallery/sort_by_name/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 500) {
    return { res, data: null };
  }
  const dataRes = await res.json();

  return { res, data: dataRes };
};
