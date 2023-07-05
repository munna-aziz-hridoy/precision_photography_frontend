import React from "react";

import dynamic from "next/dynamic";

import { addArea } from "@/api";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { AreaForm } from "./form";

const Component = () => {
  const { auth_token, removeUser } = useAuthStore();
  const router = useRouter();

  const handleAddArea = (data) => {
    const area_data = new FormData();

    area_data.append("name", data.name);
    area_data.append("description", data.description || "");
    area_data.append("cover_image", data.cover_image || null);
    area_data.append("video_tour_link", data.video_tour_link || "");
    area_data.append("virtual_tour_link", data.virtual_tour_link || "");
    area_data.append("gallery", data.gallery || null);

    addArea(auth_token?.access, area_data).then((response) => {
      const { res, data } = response;

      if (res.status === 201) {
        toast.success("Area added successfully");
        router.push("/areas");
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
    <div>
      <AreaForm handleSubmit={handleAddArea} />
    </div>
  );
};

export const AddArea = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
