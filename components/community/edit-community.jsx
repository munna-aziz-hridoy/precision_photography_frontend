import React from "react";

import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { editCommunity } from "@/api";
import { toast } from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { CommunityForm } from "./form";

import { Loading } from "@nextui-org/react";
import { useCommunityDetails } from "../hooks/useCommunityDetails";
// import Jodit from "jodit-react";

const Component = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const { auth_token, removeUser } = useAuthStore();

  const { community, loading, refetch } = useCommunityDetails(
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

    const community_data = new FormData();
    name && community_data.append("name", name);
    description && community_data.append("description", description || "");
    cover_image && community_data.append("cover_image", cover_image || null);
    video_tour_link &&
      community_data.append("video_tour_link", video_tour_link || "");
    virtual_tour_link &&
      community_data.append("virtual_tour_link", virtual_tour_link || "");

    gallery && community_data.append("gallery", gallery || null);

    editCommunity(auth_token?.access, slug, community_data).then((response) => {
      const { res, data } = response;

      if (res.status === 200) {
        toast.success("Community updated successfully");
        refetch();
      } else if (res.status === 403) {
        removeUser();
        router.push("/auth/login");
      } else if (res.status === 500) {
        toast.error("Internal server error");
      } else if (res.status === 400) {
        Object.keys(data).forEach((key) => {
          toast.error(`${key}: ${data[key][0]}`);
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
        <CommunityForm
          isUpdate
          handleSubmit={handleEditArea}
          prevData={community}
        />
      )}
    </>
  );
};

export const EditCommunity = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
