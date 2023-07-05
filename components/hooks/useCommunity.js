import { useState, useEffect } from "react";
import { getCommunities } from "@/api";

export const useCommunity = (token, page, router, toast, removeUser) => {
  const [communities, setCommunities] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCommunity = () => {
    setLoading(true);

    getCommunities(token, page).then((response) => {
      const { res, data } = response;
      setLoading(false);
      if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internel server error");
      } else if (res.status === 200) {
        setCommunities(data?.data);
        setTotalPage(data?.total_pages);
        setTotalRecords(data?.total_records);
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  useEffect(() => {
    fetchCommunity();
  }, [page, token]);

  const refetch = () => {
    fetchCommunity();
  };

  return { communities, totalPage, totalRecords, loading, refetch };
};
