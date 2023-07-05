import { useState, useEffect } from "react";
import { getGalleryDetails } from "@/api";

export const useGalleryDetails = (
  token,
  galleryId,
  router,
  toast,
  removeUser
) => {
  const [gallery, setGallery] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchGallery = () => {
    if (galleryId) {
      setLoading(true);

      getGalleryDetails(token, galleryId).then((response) => {
        const { res, data } = response;
        setLoading(false);
        if (res.status === 403) {
          removeUser();
          router.push("/auth/login");
        } else if (res.status === 500) {
          toast.error("Internel server error");
        } else if (res.status === 200) {
          setGallery(data);
          setTotalPage(data?.total_pages);
          setTotalRecords(data?.total_records);
        } else {
          toast.error("Something went wrong");
        }
      });
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [token, galleryId]);

  const refetch = () => {
    fetchGallery();
  };

  return { gallery, totalPage, totalRecords, loading, refetch };
};
