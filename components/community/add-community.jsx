import React from "react";

import dynamic from "next/dynamic";

import { addCommunity } from "@/api";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { CommunityForm } from "./form";

const Component = () => {
  const { auth_token, removeUser } = useAuthStore();
  const router = useRouter();

  const handleAddCommunity = (data) => {
    const community_data = new FormData();

    community_data.append("name", data.name);
    community_data.append("description", data.description || "");
    community_data.append("cover_image", data.cover_image || null);
    community_data.append("video_tour_link", data.video_tour_link || "");
    community_data.append("virtual_tour_link", data.virtual_tour_link || "");
    community_data.append("gallery", data.gallery || null);

    addCommunity(auth_token?.access, community_data).then((response) => {
      const { res, data } = response;

      if (res.status === 201) {
        toast.success("Community added successfully");
        router.push("/community");
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
      <CommunityForm handleSubmit={handleAddCommunity} />
    </div>
  );
};

export const AddCommunity = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
