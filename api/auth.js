import { API_URL } from "@/utils/constant";

// login

export const login = async (user) => {
  const url = `${API_URL}/login/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (res.status === 500) {
    return { res, data: null };
  }

  const data = await res.json();

  return { res, data };
};

// register

export const register = async (user) => {
  const url = `${API_URL}/register/`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (res.status === 500) {
    return { res, data: null };
  }

  const data = await res.json();

  return { res, data };
};

// get user

export const getUser = async (token) => {
  const url = `${API_URL}/user/`;

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
