import { API_URL } from "@/utils/constant";

// get all realtors

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

// add realtors

export const addRealtors = async (user, token) => {
  const url = `${API_URL}/register/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (res.status === 500) {
    return { res, data: null };
  }

  const data = await res.json();

  return { res, data };
};

// edit realtors

export const editRealtors = async (id, user, token) => {
  const url = `${API_URL}/users/${id}/`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  if (res.status === 500) {
    return { res, data: null };
  }

  const data = await res.json();

  return { res, data };
};

// delete realtors

export const deleteRealtors = async (id, token) => {
  const url = `${API_URL}/users/${id}/`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res;
};
