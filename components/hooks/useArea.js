import { useState, useEffect } from "react";
import { getAreas } from "@/api";

export const useArea = (token, page, router, toast, removeUser) => {
  const [areas, setAreas] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAreas = () => {
    setLoading(true);

    getAreas(token, page).then((response) => {
      const { res, data } = response;
      setLoading(false);
      if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internel server error");
      } else if (res.status === 200) {
        setAreas(data?.data);
        setTotalPage(data?.total_pages);
        setTotalRecords(data?.total_records);
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  useEffect(() => {
    fetchAreas();
  }, [page, token]);

  const refetch = () => {
    fetchAreas();
  };

  return { areas, totalPage, totalRecords, loading, refetch };
};
