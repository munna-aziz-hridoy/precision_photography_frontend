import { useState, useEffect } from "react";
import { getArea } from "@/api";

export const useAreaDetails = (
  token,
  slug,

  router,
  toast,
  removeUser
) => {
  const [area, setArea] = useState({});

  const [loading, setLoading] = useState(false);

  const fetchAreas = () => {
    setLoading(true);

    getArea(token, slug).then((response) => {
      const { res, data } = response;

      setLoading(false);
      if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internel server error");
      } else if (res.status === 200) {
        setArea(data);
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  useEffect(() => {
    fetchAreas();
  }, [token]);

  const refetch = () => {
    fetchAreas();
  };

  return { area, loading, refetch };
};
