import { useState, useEffect } from "react";
import { getGalleries } from "@/api";

export const useGallery = (token, page, router, toast, removeUser) => {
  const [galleries, setGalleries] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchGallery = () => {
    setLoading(true);

    getGalleries(token, page).then((response) => {
      const { res, data } = response;
      setLoading(false);
      if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internel server error");
      } else if (res.status === 200) {
        setGalleries(data?.data);
        setTotalPage(data?.total_pages);
        setTotalRecords(data?.total_records);
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  useEffect(() => {
    fetchGallery();
  }, [page, token]);

  const refetch = () => {
    fetchGallery();
  };

  return { galleries, totalPage, totalRecords, loading, refetch };
};
