import React from "react";

import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { editArea } from "@/api";
import { toast } from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { AreaForm } from "./form";
import { useAreaDetails } from "../hooks/useAreaDetails";
import { Loading } from "@nextui-org/react";
// import Jodit from "jodit-react";

const Component = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const { auth_token, removeUser } = useAuthStore();

  const { area, loading, refetch } = useAreaDetails(
    auth_token?.access,
    slug,
    router,
    toast,
    removeUser
  );

  const handleEditArea = (data) => {
    const {
      name,
      description,
      cover_image,
      video_tour_link,
      virtual_tour_link,
      gallery,
    } = data;

    const area_data = new FormData();
    name && area_data.append("name", name);
    description && area_data.append("description", description || "");
    cover_image && area_data.append("cover_image", cover_image || null);
    video_tour_link &&
      area_data.append("video_tour_link", video_tour_link || "");
    virtual_tour_link &&
      area_data.append("virtual_tour_link", virtual_tour_link || "");

    gallery && area_data.append("gallery", gallery || null);

    editArea(auth_token?.access, slug, area_data).then((response) => {
      const { res, data } = response;

      if (res.status === 200) {
        toast.success("Area updated successfully");
        refetch();
      } else if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internal server error");
      } else if (res.status === 400) {
        Object.keys(data).forEach((key) => {
          toast.error(data[key][0]);
        });
      } else {
        toast.error(data?.detail || "Something went wrong");
      }
    });
  };

  return (
    <>
      {loading ? (
        <Loading css={{ mt: "$10" }} />
      ) : (
        <AreaForm isUpdate handleSubmit={handleEditArea} prevData={area} />
      )}
    </>
  );
};

export const EditArea = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
