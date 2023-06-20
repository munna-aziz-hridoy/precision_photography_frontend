import create from "zustand";
import { persist } from "zustand/middleware";

const authStore = (set) => ({
  user: null,
  auth_token: null,
  addUser: (userData) => set({ user: userData }),
  removeUser: () => set({ user: null, auth_token: null }),
  addToken: (token) => set({ auth_token: token }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
