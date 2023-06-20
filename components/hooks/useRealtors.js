import { useState, useEffect } from "react";
import { getRealtors } from "@/api";

export const useRealtors = (token, page, router, toast, removeUser) => {
  const [users, setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchRealtors = () => {
    setLoading(true);

    getRealtors(token, page).then((response) => {
      const { res, data } = response;
      setLoading(false);
      if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internel server error");
      } else if (res.status === 200) {
        setUsers(data?.data);
        setTotalPage(data?.total_pages);
        setTotalRecords(data?.total_records);
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  useEffect(() => {
    fetchRealtors();
  }, [page, token]);

  const refetch = () => {
    fetchRealtors();
  };

  return { users, totalPage, totalRecords, loading, refetch };
};
