import { useState, useEffect } from "react";
import { getCommunity } from "@/api";

export const useCommunityDetails = (token, slug, router, toast, removeUser) => {
  const [community, setCommunity] = useState({});

  const [loading, setLoading] = useState(false);

  const fetchAreas = () => {
    setLoading(true);

    getCommunity(token, slug).then((response) => {
      const { res, data } = response;

      setLoading(false);
      if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internel server error");
      } else if (res.status === 200) {
        setCommunity(data);
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

  return { community, loading, refetch };
};
