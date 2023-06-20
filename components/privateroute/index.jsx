import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "@/store/authStore";

import dynamic from "next/dynamic";

const Component = ({ children }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return children;
};

export const PrivateRoute = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
